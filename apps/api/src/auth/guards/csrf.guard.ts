import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

/**
 * Proteção CSRF por double-submit: exige que o header `x-csrf-token`
 * bata com o cookie `csrf_token` (legível pelo JS). Aplicar em rotas
 * mutáveis que dependem de cookie (refresh/logout).
 */
@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { cookies?: Record<string, string> }>();
    const cookieToken = req.cookies?.['csrf_token'];
    const headerRaw = req.headers['x-csrf-token'];
    const headerToken = Array.isArray(headerRaw) ? headerRaw[0] : headerRaw;
    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      throw new ForbiddenException('CSRF token inválido ou ausente');
    }
    return true;
  }
}
