'use client';

import Link from 'next/link';
import { StateMessage } from '@/components/state-message';
import { api } from '@/lib/api';
import { useFetch } from '@/lib/use-fetch';

export default function HomePage() {
  const { data, error, loading } = useFetch(() => api.listCourses(), []);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Aprender tecnologia em Libras.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          Educação em tecnologia com Libras como língua de ensino de primeira classe — vídeo,
          legenda, transcrição e texto de apoio em cada aula. Nada essencial depende de áudio.
        </p>
      </section>

      <section aria-labelledby="cursos-h" className="flex flex-col gap-4">
        <h2 id="cursos-h" className="text-xl font-semibold">
          Cursos
        </h2>

        {loading ? <StateMessage>Carregando cursos…</StateMessage> : null}
        {error ? <StateMessage>Não foi possível carregar os cursos. {error}</StateMessage> : null}
        {data && data.length === 0 ? (
          <StateMessage>Nenhum curso publicado ainda.</StateMessage>
        ) : null}

        {data && data.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {data.map((course) => (
              <li key={course.id}>
                <Link
                  href={`/cursos/${course.slug}`}
                  className="block h-full rounded-xl border border-neutral-200 p-5 transition-colors hover:border-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-neutral-800 dark:hover:border-indigo-500"
                >
                  <h3 className="font-semibold">{course.title}</h3>
                  {course.description ? (
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      {course.description}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}
