import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { User } from '@prisma/client';
import type { Env } from '../config/env.validation';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from './token.service';
import type { AuthUser } from './types';

interface IssuedTokens {
  accessToken: string;
  refreshToken: string;
}
interface AuthResult extends IssuedTokens {
  user: AuthUser;
}
export interface RequestMeta {
  userAgent?: string;
  ip?: string;
}

@Injectable()
export class AuthService {
  private dummyHash?: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService,
    private readonly mail: MailService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  private toAuthUser(user: User): AuthUser {
    return { id: user.id, email: user.email, role: user.role };
  }

  /** Hash fixo p/ mitigar timing attack quando o e-mail não existe. */
  private async getDummyHash(): Promise<string> {
    if (!this.dummyHash) {
      this.dummyHash = await argon2.hash('#dummy-password#', { type: argon2.argon2id });
    }
    return this.dummyHash;
  }

  /** Gera um token CSRF (double-submit cookie/header). */
  generateCsrfToken(): string {
    return this.tokens.generateOpaqueToken();
  }

  private async createSession(
    user: User,
    family: string,
    meta: RequestMeta,
  ): Promise<IssuedTokens> {
    const accessToken = await this.tokens.signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this.tokens.generateOpaqueToken();
    const tokenHash = this.tokens.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + this.tokens.refreshTtlSeconds() * 1000);
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        family,
        expiresAt,
        userAgent: meta.userAgent ?? null,
        ip: meta.ip ?? null,
      },
    });
    return { accessToken, refreshToken };
  }

  async register(
    email: string,
    password: string,
    name: string | undefined,
    meta: RequestMeta,
  ): Promise<AuthResult> {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('E-mail já cadastrado');
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const user = await this.prisma.user.create({
      data: { email, passwordHash, name: name ?? null },
    });
    const tokens = await this.createSession(user, this.tokens.generateFamily(), meta);
    return { user: this.toAuthUser(user), ...tokens };
  }

  async login(email: string, password: string, meta: RequestMeta): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      await argon2.verify(await this.getDummyHash(), password).catch(() => false);
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const valid = await argon2.verify(user.passwordHash, password).catch(() => false);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');
    const tokens = await this.createSession(user, this.tokens.generateFamily(), meta);
    return { user: this.toAuthUser(user), ...tokens };
  }

  async refresh(refreshToken: string | undefined, meta: RequestMeta): Promise<AuthResult> {
    if (!refreshToken) throw new UnauthorizedException('Sessão ausente');
    const tokenHash = this.tokens.hashToken(refreshToken);
    const record = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
    if (!record) throw new UnauthorizedException('Sessão inválida');

    if (record.revokedAt) {
      // Reuso de token já revogado => possível roubo: revoga a família inteira.
      await this.prisma.refreshToken.updateMany({
        where: { family: record.family, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Sessão inválida (reuso detectado)');
    }
    if (record.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Sessão expirada');
    }

    await this.prisma.refreshToken.update({
      where: { id: record.id },
      data: { revokedAt: new Date() },
    });
    const tokens = await this.createSession(record.user, record.family, meta);
    return { user: this.toAuthUser(record.user), ...tokens };
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) return;
    const tokenHash = this.tokens.hashToken(refreshToken);
    const record = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!record) return;
    await this.prisma.refreshToken.updateMany({
      where: { family: record.family, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async logoutAll(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return; // não revela se o e-mail existe
    const token = this.tokens.generateOpaqueToken();
    const tokenHash = this.tokens.hashToken(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h
    await this.prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });
    const webUrl = this.config.get('WEB_APP_URL', { infer: true });
    await this.mail.sendPasswordReset(user.email, `${webUrl}/reset-password?token=${token}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const tokenHash = this.tokens.hashToken(token);
    const record = await this.prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException('Token inválido ou expirado');
    }
    const passwordHash = await argon2.hash(newPassword, { type: argon2.argon2id });
    // Redefinir senha invalida todas as sessões ativas.
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      this.prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId: record.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
  }

  async me(userId: string): Promise<{
    id: string;
    email: string;
    name: string | null;
    role: User['role'];
    createdAt: Date;
  }> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
