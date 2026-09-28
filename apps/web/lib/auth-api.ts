import type { AuthMe, AuthResponse } from '@signcode/contracts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

async function toError(res: Response): Promise<Error> {
  try {
    const data = (await res.json()) as { message?: string | string[] };
    const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
    return new Error(msg ?? `Erro ${res.status}`);
  } catch {
    return new Error(`Erro ${res.status}`);
  }
}

async function post<T>(path: string, body?: unknown, withCsrf = false): Promise<T> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    accept: 'application/json',
  };
  if (withCsrf) {
    const token = readCookie('csrf_token');
    if (token) headers['x-csrf-token'] = token;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw await toError(res);
  return (await res.json()) as T;
}

export const authApi = {
  register: (body: { email: string; password: string; name?: string }) =>
    post<AuthResponse>('/auth/register', body),
  login: (body: { email: string; password: string }) => post<AuthResponse>('/auth/login', body),
  logout: () => post<{ ok: boolean }>('/auth/logout', undefined, true),
  refresh: () => post<AuthResponse>('/auth/refresh', undefined, true),
  forgotPassword: (body: { email: string }) => post<{ ok: boolean }>('/auth/forgot-password', body),
  resetPassword: (body: { token: string; password: string }) =>
    post<{ ok: boolean }>('/auth/reset-password', body),
  me: async (): Promise<AuthMe | null> => {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
      headers: { accept: 'application/json' },
    });
    if (res.status === 401) return null;
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return (await res.json()) as AuthMe;
  },
};
