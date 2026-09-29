import type { UserProfile } from '@signcode/contracts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export const profileApi = {
  get: async (): Promise<UserProfile | null> => {
    const res = await fetch(`${API_URL}/me/profile`, {
      credentials: 'include',
      headers: { accept: 'application/json' },
    });
    if (res.status === 401) return null;
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return (await res.json()) as UserProfile;
  },
  update: async (patch: Partial<UserProfile>): Promise<UserProfile> => {
    const headers: Record<string, string> = {
      'content-type': 'application/json',
      accept: 'application/json',
    };
    const token = readCookie('csrf_token');
    if (token) headers['x-csrf-token'] = token;
    const res = await fetch(`${API_URL}/me/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers,
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return (await res.json()) as UserProfile;
  },
};
