/**
 * Contratos compartilhados entre web e api.
 *
 * Estratégia (ADR-0005): o OpenAPI da API é a fonte de verdade; futuramente estes tipos
 * serão gerados a partir dele. Por ora, são mantidos à mão e espelham as respostas da API.
 */

/** Resposta do healthcheck da API (GET /health). */
export interface HealthStatus {
  status: 'ok';
  service: string;
  version: string;
  timestamp: string;
}

// ---------- Conteúdo (catálogo) ----------

export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
}

export interface LessonTranslationSummary {
  languageCode: string;
  title: string;
  summary: string | null;
}

export interface CourseTreeLesson {
  id: string;
  slug: string;
  order: number;
  durationSeconds: number | null;
  translations: LessonTranslationSummary[];
}

export interface CourseTreeModule {
  id: string;
  title: string;
  description: string | null;
  order: number;
  lessons: CourseTreeLesson[];
}

export interface CourseTree {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  order: number;
  modules: CourseTreeModule[];
}

// ---------- Conteúdo (aula) ----------

export interface LessonTranslation {
  languageCode: string;
  title: string;
  summary: string | null;
  bodyMarkdown: string | null;
  caption: string | null;
  transcript: string | null;
  objectives: string[];
}

export interface LessonVideo {
  languageCode: string;
  provider: string;
  externalId: string;
  durationSeconds: number | null;
}

export interface LessonMaterial {
  id: string;
  title: string;
  url: string;
  order: number;
}

export interface LessonDetail {
  id: string;
  slug: string;
  order: number;
  durationSeconds: number | null;
  courseSlug: string;
  moduleId: string;
  translations: LessonTranslation[];
  videos: LessonVideo[];
  materials: LessonMaterial[];
}

// ---------- Auth ----------

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  csrfToken: string;
}

export interface AuthMe {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
}
