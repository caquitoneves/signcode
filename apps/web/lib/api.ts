import type { CourseSummary, CourseTree, LessonDetail } from '@projetox/contracts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Não foi possível carregar (${res.status})`);
  }
  return (await res.json()) as T;
}

export const api = {
  listCourses: () => apiGet<CourseSummary[]>('/courses'),
  getCourse: (slug: string) => apiGet<CourseTree>(`/courses/${encodeURIComponent(slug)}`),
  getLesson: (id: string) => apiGet<LessonDetail>(`/lessons/${encodeURIComponent(id)}`),
};
