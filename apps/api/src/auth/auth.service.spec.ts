import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { Env } from '../config/env.validation';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

function buildPrismaMock() {
  return {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    passwordResetToken: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    $transaction: jest.fn(async (ops: unknown[]) => Promise.all(ops as Promise<unknown>[])),
  };
}

function buildTokenMock() {
  return {
    signAccessToken: jest.fn().mockResolvedValue('access.jwt'),
    generateOpaqueToken: jest.fn().mockReturnValue('opaque-refresh'),
    generateFamily: jest.fn().mockReturnValue('fam-1'),
    hashToken: jest.fn((t: string) => `h:${t}`),
    refreshTtlSeconds: jest.fn().mockReturnValue(1_209_600),
    accessTtlSeconds: jest.fn().mockReturnValue(900),
  };
}

describe('AuthService', () => {
  let prisma: ReturnType<typeof buildPrismaMock>;
  let tokens: ReturnType<typeof buildTokenMock>;
  let mail: { sendPasswordReset: jest.Mock };
  let config: { get: jest.Mock };
  let service: AuthService;

  const meta = { userAgent: 'jest', ip: '127.0.0.1' };

  beforeEach(() => {
    prisma = buildPrismaMock();
    tokens = buildTokenMock();
    mail = { sendPasswordReset: jest.fn() };
    config = { get: jest.fn().mockReturnValue('http://localhost:3000') };
    service = new AuthService(
      prisma as unknown as PrismaService,
      tokens as unknown as TokenService,
      mail as unknown as MailService,
      config as unknown as ConfigService<Env, true>,
    );
  });

  it('register: rejeita e-mail já existente', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'u1' });
    await expect(
      service.register('a@b.com', 'password123', undefined, meta),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('register: cria usuário e sessão', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      role: 'STUDENT',
      passwordHash: 'x',
      name: null,
    });
    prisma.refreshToken.create.mockResolvedValue({});

    const res = await service.register('a@b.com', 'password123', undefined, meta);

    expect(res.user).toEqual({ id: 'u1', email: 'a@b.com', role: 'STUDENT' });
    expect(res.accessToken).toBe('access.jwt');
    expect(res.refreshToken).toBe('opaque-refresh');
    expect(prisma.refreshToken.create).toHaveBeenCalledTimes(1);
  });

  it('login: senha incorreta => Unauthorized', async () => {
    const hash = await argon2.hash('correct-password', { type: argon2.argon2id });
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      role: 'STUDENT',
      passwordHash: hash,
    });
    await expect(service.login('a@b.com', 'wrong-password', meta)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('login: sucesso emite tokens', async () => {
    const hash = await argon2.hash('correct-password', { type: argon2.argon2id });
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      role: 'STUDENT',
      passwordHash: hash,
    });
    prisma.refreshToken.create.mockResolvedValue({});
    const res = await service.login('a@b.com', 'correct-password', meta);
    expect(res.accessToken).toBe('access.jwt');
    expect(res.refreshToken).toBe('opaque-refresh');
  });

  it('refresh: detecta reuso e revoga a família inteira', async () => {
    prisma.refreshToken.findUnique.mockResolvedValue({
      id: 'rt1',
      family: 'fam-1',
      userId: 'u1',
      revokedAt: new Date(),
      expiresAt: new Date(Date.now() + 10_000),
      user: { id: 'u1', email: 'a@b.com', role: 'STUDENT' },
    });
    await expect(service.refresh('opaque-refresh', meta)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ family: 'fam-1' }) }),
    );
  });

  it('refresh: rotaciona (revoga o antigo e cria um novo)', async () => {
    prisma.refreshToken.findUnique.mockResolvedValue({
      id: 'rt1',
      family: 'fam-1',
      userId: 'u1',
      revokedAt: null,
      expiresAt: new Date(Date.now() + 100_000),
      user: { id: 'u1', email: 'a@b.com', role: 'STUDENT' },
    });
    prisma.refreshToken.update.mockResolvedValue({});
    prisma.refreshToken.create.mockResolvedValue({});

    const res = await service.refresh('opaque-refresh', meta);

    expect(prisma.refreshToken.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'rt1' } }),
    );
    expect(prisma.refreshToken.create).toHaveBeenCalledTimes(1);
    expect(res.accessToken).toBe('access.jwt');
  });

  it('resetPassword: token inválido => BadRequest', async () => {
    prisma.passwordResetToken.findUnique.mockResolvedValue(null);
    await expect(service.resetPassword('tok-invalido', 'newpassword1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('resetPassword: sucesso troca senha e invalida sessões', async () => {
    prisma.passwordResetToken.findUnique.mockResolvedValue({
      id: 'pr1',
      userId: 'u1',
      usedAt: null,
      expiresAt: new Date(Date.now() + 100_000),
    });
    await service.resetPassword('tok-valido', 'newpassword1');
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });
});
