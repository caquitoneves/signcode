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
  challenges?: ModuleItemRef[];
  miniProject?: ModuleItemRef | null;
  checkpoint?: ModuleItemRef | null;
}

export interface CourseTree {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  order: number;
  modules: CourseTreeModule[];
  assessment?: { id: string; title: string } | null;
  finalProject?: { id: string; title: string } | null;
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
  role: string;
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
  emailVerified: string | null;
  createdAt: string;
}

export interface UserProfile {
  name: string | null;
  username: string | null;
  bio: string | null;
  pronouns: string | null;
  city: string | null;
  learningGoal: string | null;
  theme: string;
  emailReminders: boolean;
  weeklySummary: boolean;
  courseRecommendations: boolean;
}

// ---------- Progresso ----------

export interface CourseProgress {
  enrolled: boolean;
  total: number;
  completed: number;
  completedLessonIds: string[];
}

// ---------- Exercícios ----------

export interface ExerciseOptionPublic {
  id: string;
  text: string;
}

export interface ExercisePublic {
  id: string;
  order: number;
  type: string;
  prompt: string;
  options: ExerciseOptionPublic[];
}

export interface ExerciseSubmissionResult {
  correct: boolean;
  explanation: string | null;
}

// ---------- Painel ----------

export interface DashboardCourse {
  course: { id: string; slug: string; title: string; description: string | null };
  total: number;
  completed: number;
  enrolledAt: string;
}

// ---------- Experiência de aprendizagem (Incremento 8) ----------

/** Referência leve de um item dentro do módulo (para montar a sequência). */
export interface ModuleItemRef {
  id: string;
  title: string;
  order: number;
}

/** Desafio de código (visão pública — sem gabarito, os testes rodam no cliente). */
export interface ChallengePublic {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  languageCode: string;
  tests: { description: string; assert: string }[];
}

export type ProjectKind = 'MINI' | 'FINAL';

export interface ProjectPublic {
  id: string;
  kind: ProjectKind;
  title: string;
  brief: string;
  requirements: string[];
}

export interface ProjectSubmissionResult {
  repoUrl: string | null;
  liveUrl: string | null;
  notes: string | null;
  submittedAt: string;
}

/** Checkpoint (quiz de módulo) — visão pública sem marcar a alternativa correta. */
export interface CheckpointQuestionPublic {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
}

export interface CheckpointPublic {
  id: string;
  title: string;
  description: string | null;
  questions: CheckpointQuestionPublic[];
}

export interface CheckpointCorrection {
  questionId: string;
  correctOptionId: string | null;
  explanation: string | null;
}

export interface CheckpointResult {
  score: number;
  total: number;
  passed: boolean;
  corrections: CheckpointCorrection[];
}

export type AssessmentQuestionKind = 'SINGLE_CHOICE' | 'TEXT' | 'SCALE';
export type AssessmentPhase = 'BEFORE' | 'AFTER';

export interface AssessmentQuestionPublic {
  id: string;
  kind: AssessmentQuestionKind;
  prompt: string;
  options: { id: string; text: string }[];
}

export interface AssessmentStatus {
  assessmentId: string | null;
  respondedBefore: boolean;
}

export interface AssessmentPublic {
  id: string;
  title: string;
  description: string | null;
  questions: AssessmentQuestionPublic[];
}

// ---------- Árvore do curso (enriquecida) ----------
