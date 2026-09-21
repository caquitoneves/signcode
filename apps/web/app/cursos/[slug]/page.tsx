'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { CourseTreeLesson } from '@projetox/contracts';
import { StateMessage } from '@/components/state-message';
import { api } from '@/lib/api';
import { formatDuration } from '@/lib/format';
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
  const { data, error, loading } = useFetch(() => api.getCourse(slug), [slug]);

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
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
            {data.description ? (
              <p className="text-neutral-600 dark:text-neutral-300">{data.description}</p>
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
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/aulas/${lesson.id}`}
                          className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-neutral-900"
                        >
                          <span>{lessonTitle(lesson)}</span>
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
