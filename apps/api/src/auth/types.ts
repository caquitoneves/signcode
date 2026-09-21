import type { Role } from '@prisma/client';

/** Conteúdo do access token (JWT). */
export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

/** Usuário autenticado anexado à request. */
export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}
