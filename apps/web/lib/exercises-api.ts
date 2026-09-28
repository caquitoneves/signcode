import type { ExercisePublic, ExerciseSubmissionResult } from '@signcode/contracts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export const exercisesApi = {
  listForLesson: async (lessonId: string): Promise<ExercisePublic[]> => {
    const res = await fetch(`${API_URL}/lessons/${encodeURIComponent(lessonId)}/exercises`, {
      headers: { accept: 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return (await res.json()) as ExercisePublic[];
  },
  submit: async (
    exerciseId: string,
    answer: { optionId?: string; text?: string },
  ): Promise<ExerciseSubmissionResult> => {
    const headers: Record<string, string> = {
      'content-type': 'application/json',
      accept: 'application/json',
    };
    const token = readCookie('csrf_token');
    if (token) headers['x-csrf-token'] = token;
    const res = await fetch(`${API_URL}/exercises/${encodeURIComponent(exerciseId)}/submit`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(answer),
    });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return (await res.json()) as ExerciseSubmissionResult;
  },
};
