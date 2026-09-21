import type { CookieOptions, Response } from 'express';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';
export const CSRF_COOKIE = 'csrf_token';

export interface CookieConfig {
  isProd: boolean;
  domain?: string;
  accessTtl: number;
  refreshTtl: number;
}

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

function httpOnlyBase(cfg: CookieConfig): CookieOptions {
  return {
    httpOnly: true,
    secure: cfg.isProd,
    sameSite: 'lax',
    domain: cfg.domain,
    path: '/',
  };
}

export function setAuthCookies(
  res: Response,
  tokens: SessionTokens,
  csrfToken: string,
  cfg: CookieConfig,
): void {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, {
    ...httpOnlyBase(cfg),
    maxAge: cfg.accessTtl * 1000,
  });
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
    ...httpOnlyBase(cfg),
    sameSite: 'strict',
    maxAge: cfg.refreshTtl * 1000,
  });
  // Legível pelo JS (double-submit CSRF): o SPA reenvia em x-csrf-token.
  res.cookie(CSRF_COOKIE, csrfToken, {
    httpOnly: false,
    secure: cfg.isProd,
    sameSite: 'strict',
    domain: cfg.domain,
    path: '/',
    maxAge: cfg.refreshTtl * 1000,
  });
}

export function clearAuthCookies(res: Response, cfg: CookieConfig): void {
  const opts = { domain: cfg.domain, path: '/' };
  res.clearCookie(ACCESS_COOKIE, opts);
  res.clearCookie(REFRESH_COOKIE, opts);
  res.clearCookie(CSRF_COOKIE, opts);
}
