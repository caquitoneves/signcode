import type {
  AssessmentPhase,
  AssessmentPublic,
  ChallengePublic,
  CheckpointPublic,
  CheckpointResult,
  ProjectPublic,
  ProjectSubmissionResult,
} from '@projetox/contracts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

async function req<T>(path: string, method: 'GET' | 'POST' = 'GET', body?: unknown): Promise<T> {
  const headers: Record<string, string> = { accept: 'application/json' };
  if (method !== 'GET') {
    headers['content-type'] = 'application/json';
    const token = readCookie('csrf_token');
    if (token) headers['x-csrf-token'] = token;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return (await res.json()) as T;
}

export const experienceApi = {
  getChallenge: (id: string) => req<ChallengePublic>(`/challenges/${encodeURIComponent(id)}`),
  submitChallenge: (id: string, code: string, passed: boolean) =>
    req(`/challenges/${encodeURIComponent(id)}/submit`, 'POST', { code, passed }),

  getCheckpoint: (id: string) => req<CheckpointPublic>(`/checkpoints/${encodeURIComponent(id)}`),
  submitCheckpoint: (id: string, answers: { questionId: string; optionId: string }[]) =>
    req<CheckpointResult>(`/checkpoints/${encodeURIComponent(id)}/attempt`, 'POST', { answers }),

  getAssessment: (slug: string) =>
    req<AssessmentPublic | null>(`/courses/${encodeURIComponent(slug)}/assessment`),
  respondAssessment: (id: string, phase: AssessmentPhase, answers: Record<string, string>) =>
    req(`/assessments/${encodeURIComponent(id)}/respond`, 'POST', { phase, answers }),

  getProject: (id: string) => req<ProjectPublic>(`/projects/${encodeURIComponent(id)}`),
  getProjectSubmission: (id: string) =>
    req<ProjectSubmissionResult | null>(`/projects/${encodeURIComponent(id)}/submission`),
  submitProject: (id: string, data: { repoUrl?: string; liveUrl?: string; notes?: string }) =>
    req<ProjectSubmissionResult>(`/projects/${encodeURIComponent(id)}/submit`, 'POST', data),
};
