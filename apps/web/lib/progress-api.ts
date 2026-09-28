import type { CourseProgress, DashboardCourse } from '@signcode/contracts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

async function req<T>(path: string, method: 'GET' | 'POST' | 'DELETE' = 'GET'): Promise<T> {
  const headers: Record<string, string> = { accept: 'application/json' };
  if (method !== 'GET') {
    const token = readCookie('csrf_token');
    if (token) headers['x-csrf-token'] = token;
  }
  const res = await fetch(`${API_URL}${path}`, { method, credentials: 'include', headers });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return (await res.json()) as T;
}

export const progressApi = {
  getCourseProgress: (slug: string) =>
    req<CourseProgress>(`/courses/${encodeURIComponent(slug)}/progress`),
  enroll: (slug: string) => req(`/courses/${encodeURIComponent(slug)}/enroll`, 'POST'),
  complete: (lessonId: string) => req(`/lessons/${encodeURIComponent(lessonId)}/complete`, 'POST'),
  uncomplete: (lessonId: string) =>
    req(`/lessons/${encodeURIComponent(lessonId)}/complete`, 'DELETE'),
  getDashboard: () => req<DashboardCourse[]>('/me/dashboard'),
};
