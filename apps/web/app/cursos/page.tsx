'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { CourseCardsSkeleton, ErrorState } from '@/components/skeleton';
import { Card, LibrasBadge } from '@/components/ui';
import { useCourses } from '@/lib/queries';

export default function CursosPage() {
  const { data: courses, isPending, isError, refetch } = useCourses();

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-2">
          <LibrasBadge className="w-fit" />
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Cursos</h1>
          <p className="max-w-2xl text-muted">
            Trilhas de tecnologia pensadas em Libras, do zero à carreira. Escolha por onde começar.
          </p>
        </header>

        {isPending ? <CourseCardsSkeleton count={3} /> : null}
        {isError ? (
          <ErrorState
            message="Não foi possível carregar os cursos."
            onRetry={() => void refetch()}
          />
        ) : null}

        {courses ? (
          courses.length === 0 ? (
            <Card className="p-8 text-center text-muted">
              Ainda não há cursos disponíveis. Em breve, novas trilhas.
            </Card>
          ) : (
            <ul className="grid animate-fade-in gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <li key={c.id}>
                  <Link href={`/cursos/${c.slug}`} className="group block h-full">
                    <Card className="lift flex h-full flex-col gap-3 p-5 transition-colors group-hover:border-brand/50">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                        <BookOpen className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h2 className="font-semibold">{c.title}</h2>
                      {c.description ? (
                        <p className="line-clamp-3 text-sm text-muted">{c.description}</p>
                      ) : null}
                      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-brand">
                        Ver curso
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : null}
      </div>
    </main>
  );
}
