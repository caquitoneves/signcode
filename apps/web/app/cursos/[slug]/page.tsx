'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  PlayCircle,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CourseTree, CourseTreeLesson } from '@projetox/contracts';
import { StateMessage } from '@/components/state-message';
import { Button, Card, LibrasBadge, ProgressBar } from '@/components/ui';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { formatDuration } from '@/lib/format';
import { progressApi } from '@/lib/progress-api';
import { useFetch } from '@/lib/use-fetch';

function lessonTitle(lesson: CourseTreeLesson): string {
  return (
    lesson.translations.find((t) => t.languageCode === 'pt-BR')?.title ??
    lesson.translations[0]?.title ??
    lesson.slug
  );
}

function formatTotal(seconds: number): string | null {
  if (seconds <= 0) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  if (h > 0) return m > 0 ? `${h} h ${m} min` : `${h} h`;
  return `${m} min`;
}

function MetaChip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-elevated px-3 py-1 text-sm text-muted">
      <span className="text-brand" aria-hidden="true">
        {icon}
      </span>
      {children}
    </span>
  );
}

export default function CoursePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { user } = useAuth();
  const { data, error, loading } = useFetch<CourseTree>(() => api.getCourse(slug), [slug]);

  const [progress, setProgress] = useState<{
    enrolled: boolean;
    total: number;
    completed: number;
    completedLessonIds: string[];
  } | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  const loadProgress = useCallback(async () => {
    if (!user) {
      setProgress(null);
      return;
    }
    try {
      setProgress(await progressApi.getCourseProgress(slug));
    } catch {
      setProgress(null);
    }
  }, [user, slug]);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  async function enroll(): Promise<void> {
    setEnrolling(true);
    try {
      await progressApi.enroll(slug);
      await loadProgress();
    } finally {
      setEnrolling(false);
    }
  }

  const done = useMemo(
    () => new Set(progress?.completedLessonIds ?? []),
    [progress?.completedLessonIds],
  );

  const stats = useMemo(() => {
    if (!data) return { lessons: 0, duration: 0, flat: [] as CourseTreeLesson[] };
    const flat = data.modules.flatMap((m) => m.lessons);
    const duration = flat.reduce((s, l) => s + (l.durationSeconds ?? 0), 0);
    return { lessons: flat.length, duration, flat };
  }, [data]);

  // Próxima aula não concluída (fallback: primeira aula).
  const startLesson = useMemo(() => {
    const next = stats.flat.find((l) => !done.has(l.id));
    return next ?? stats.flat[0] ?? null;
  }, [stats.flat, done]);

  const pct =
    progress && progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const started = (progress?.completed ?? 0) > 0;
  const totalDuration = formatTotal(stats.duration);

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Todos os cursos
        </Link>

        {loading ? <StateMessage>Carregando curso…</StateMessage> : null}
        {error ? <StateMessage>Não foi possível carregar o curso. {error}</StateMessage> : null}

        {data ? (
          <>
            {/* Hero do curso */}
            <Card className="glass flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-4">
                <LibrasBadge />
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{data.title}</h1>
                {data.description ? (
                  <p className="max-w-2xl text-lg leading-relaxed text-muted">{data.description}</p>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <MetaChip icon={<Layers className="h-4 w-4" />}>
                    {data.modules.length} módulos
                  </MetaChip>
                  <MetaChip icon={<BookOpen className="h-4 w-4" />}>{stats.lessons} aulas</MetaChip>
                  {totalDuration ? (
                    <MetaChip icon={<Clock className="h-4 w-4" />}>{totalDuration}</MetaChip>
                  ) : null}
                </div>
              </div>

              {/* Painel de ação */}
              <div className="flex w-full shrink-0 flex-col gap-3 lg:w-64">
                {user && progress ? (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">
                        {progress.completed} de {progress.total} aulas
                      </span>
                      <span className="font-medium text-brand">{pct}%</span>
                    </div>
                    <ProgressBar value={progress.completed} max={progress.total} />
                  </>
                ) : null}

                {startLesson ? (
                  <Link href={`/aulas/${startLesson.id}`}>
                    <Button className="w-full">
                      {started ? 'Continuar' : 'Começar agora'}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                ) : null}

                {user && progress && !progress.enrolled ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => void enroll()}
                    disabled={enrolling}
                  >
                    {enrolling ? 'Matriculando…' : 'Matricular-se'}
                  </Button>
                ) : null}

                {!user ? (
                  <Link href="/entrar">
                    <Button variant="secondary" className="w-full">
                      Entrar para salvar progresso
                    </Button>
                  </Link>
                ) : null}
              </div>
            </Card>

            {/* Conteúdo (módulos e aulas) */}
            <div className="flex flex-col gap-8">
              <h2 className="text-xl font-bold tracking-tight">Conteúdo do curso</h2>
              {[...data.modules]
                .sort((a, b) => a.order - b.order)
                .map((mod, mi) => {
                  const lessons = [...mod.lessons].sort((a, b) => a.order - b.order);
                  const modDone = lessons.filter((l) => done.has(l.id)).length;
                  return (
                    <section key={mod.id} aria-label={mod.title} className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/15 text-sm font-bold text-brand">
                            {mi + 1}
                          </span>
                          {mod.title}
                        </h3>
                        {user && progress ? (
                          <span className="text-sm text-muted">
                            {modDone}/{lessons.length}
                          </span>
                        ) : null}
                      </div>
                      <Card className="divide-y divide-edge overflow-hidden">
                        {lessons.map((lesson, li) => {
                          const duration = formatDuration(lesson.durationSeconds);
                          const isDone = done.has(lesson.id);
                          return (
                            <Link
                              key={lesson.id}
                              href={`/aulas/${lesson.id}`}
                              className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
                            >
                              {isDone ? (
                                <CheckCircle2
                                  className="h-5 w-5 shrink-0 text-brand"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlayCircle
                                  className="h-5 w-5 shrink-0 text-muted"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="w-6 shrink-0 text-sm tabular-nums text-muted">
                                {li + 1}.
                              </span>
                              <span className="flex-1">{lessonTitle(lesson)}</span>
                              {isDone ? <span className="sr-only">(concluída)</span> : null}
                              {duration ? (
                                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted">
                                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                  {duration}
                                </span>
                              ) : null}
                            </Link>
                          );
                        })}
                      </Card>
                    </section>
                  );
                })}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
