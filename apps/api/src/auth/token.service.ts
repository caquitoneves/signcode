import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import type { Env } from '../config/env.validation';
import type { JwtPayload } from './types';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async signAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET', { infer: true }),
      expiresIn: this.config.get('JWT_ACCESS_TTL', { infer: true }),
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwt.verifyAsync<JwtPayload>(token, {
      secret: this.config.get('JWT_ACCESS_SECRET', { infer: true }),
    });
  }

  /** Token opaco de alta entropia (refresh / reset). */
  generateOpaqueToken(): string {
    return randomBytes(48).toString('base64url');
  }

  /** Identificador de família p/ rotação e detecção de reuso. */
  generateFamily(): string {
    return randomUUID();
  }

  /** Hash determinístico p/ armazenar/consultar tokens opacos (não são senhas). */
  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  accessTtlSeconds(): number {
    return this.config.get('JWT_ACCESS_TTL', { infer: true });
  }

  refreshTtlSeconds(): number {
    return this.config.get('JWT_REFRESH_TTL', { infer: true });
  }
}
