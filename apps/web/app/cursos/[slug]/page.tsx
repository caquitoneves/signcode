'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { CourseTreeLesson } from '@projetox/contracts';
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

export default function CoursePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { user } = useAuth();
  const { data, error, loading } = useFetch(() => api.getCourse(slug), [slug]);

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

  const done = new Set(progress?.completedLessonIds ?? []);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10">
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
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
              <LibrasBadge />
            </div>
            {data.description ? <p className="text-muted">{data.description}</p> : null}
          </div>

          {user && progress ? (
            <Card className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">
                  {progress.completed} de {progress.total} aulas concluídas
                </span>
                {!progress.enrolled ? (
                  <Button size="sm" onClick={() => void enroll()} disabled={enrolling}>
                    Matricular-se
                  </Button>
                ) : (
                  <span className="text-sm font-medium text-brand">
                    {progress.total > 0
                      ? Math.round((progress.completed / progress.total) * 100)
                      : 0}
                    %
                  </span>
                )}
              </div>
              <ProgressBar value={progress.completed} max={progress.total} />
            </Card>
          ) : null}

          <div className="flex flex-col gap-8">
            {data.modules.map((mod, mi) => (
              <section key={mod.id} aria-label={mod.title} className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/15 text-xs font-bold text-brand">
                    {mi + 1}
                  </span>
                  {mod.title}
                </h2>
                <Card className="divide-y divide-edge overflow-hidden">
                  {mod.lessons.map((lesson) => {
                    const duration = formatDuration(lesson.durationSeconds);
                    const isDone = done.has(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/aulas/${lesson.id}`}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
                      >
                        {isDone ? (
                          <CheckCircle2
                            className="h-5 w-5 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlayCircle className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                        )}
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
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
