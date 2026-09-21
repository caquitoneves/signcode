'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { CourseProgress, CourseTreeLesson } from '@projetox/contracts';
import { StateMessage } from '@/components/state-message';
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

  const [progress, setProgress] = useState<CourseProgress | null>(null);
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
        className="w-fit text-sm text-indigo-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
      >
        ← Todos os cursos
      </Link>

      {loading ? <StateMessage>Carregando curso…</StateMessage> : null}
      {error ? <StateMessage>Não foi possível carregar o curso. {error}</StateMessage> : null}

      {data ? (
        <>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
            {data.description ? (
              <p className="text-neutral-600 dark:text-neutral-300">{data.description}</p>
            ) : null}

            {user && progress ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
                  <span>
                    {progress.completed} de {progress.total} aulas concluídas
                  </span>
                  {!progress.enrolled ? (
                    <button
                      type="button"
                      onClick={() => void enroll()}
                      disabled={enrolling}
                      className="rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Matricular-se
                    </button>
                  ) : null}
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={progress.total}
                  aria-valuenow={progress.completed}
                >
                  <div
                    className="h-full bg-green-600 transition-all"
                    style={{
                      width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-8">
            {data.modules.map((mod, mi) => (
              <section key={mod.id} aria-label={mod.title} className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">
                  {mi + 1}. {mod.title}
                </h2>
                <ul className="flex flex-col divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
                  {mod.lessons.map((lesson) => {
                    const duration = formatDuration(lesson.durationSeconds);
                    const isDone = done.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/aulas/${lesson.id}`}
                          className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-neutral-900"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className={
                                isDone ? 'text-green-600' : 'text-neutral-300 dark:text-neutral-700'
                              }
                            >
                              ✓
                            </span>
                            <span>{lessonTitle(lesson)}</span>
                            {isDone ? <span className="sr-only">(concluída)</span> : null}
                          </span>
                          {duration ? (
                            <span className="shrink-0 text-sm text-neutral-500">{duration}</span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
