'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Captions,
  GraduationCap,
  Hand,
  ListChecks,
  Sparkles,
  VolumeX,
} from 'lucide-react';
import { HeroArt } from '@/components/illustrations';
import { StateMessage } from '@/components/state-message';
import { Button, Card, LibrasBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { useFetch } from '@/lib/use-fetch';

const FEATURES = [
  {
    icon: Hand,
    title: 'Libras em primeiro lugar',
    text: 'A aula nasce em Libras — não é legenda nem janela de canto.',
  },
  {
    icon: Captions,
    title: 'Legenda e transcrição',
    text: 'Todo conteúdo com apoio escrito em português.',
  },
  {
    icon: VolumeX,
    title: 'Sem depender de áudio',
    text: 'Nada essencial exige som. Feedback sempre visual.',
  },
  {
    icon: ListChecks,
    title: 'Prática de verdade',
    text: 'Exercícios e progresso desde a primeira aula.',
  },
];

export default function HomePage() {
  const { data, error, loading } = useFetch(() => api.listCourses(), []);

  return (
    <div className="aurora">
      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16">
        {/* Hero */}
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Acessível desde o primeiro dia
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Aprender tecnologia <span className="text-brand">em Libras</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Uma plataforma de educação em tecnologia feita para pessoas surdas — com Libras como
              língua de ensino de primeira classe, legenda, transcrição e prática.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#cursos">
                <Button>
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Ver cursos
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button variant="secondary">Criar conta</Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <HeroArt />
          </div>
        </section>

        {/* Diferenciais */}
        <section aria-label="Diferenciais" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="flex flex-col gap-3 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted">{f.text}</p>
            </Card>
          ))}
        </section>

        {/* Turma piloto */}
        <section className="glass flex flex-col items-center gap-3 rounded-2xl p-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Turma piloto
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Estamos formando a primeira turma</h2>
          <p className="max-w-xl text-muted">
            Vagas limitadas para os primeiros alunos moldarem a plataforma com a gente. Seu feedback
            define os próximos cursos.
          </p>
          <Link href="/cadastro">
            <Button>
              Quero participar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </section>

        {/* Cursos */}
        <section
          id="cursos"
          aria-labelledby="cursos-h"
          className="flex scroll-mt-20 flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <h2 id="cursos-h" className="text-2xl font-bold tracking-tight">
              Cursos
            </h2>
          </div>

          {loading ? <StateMessage>Carregando cursos…</StateMessage> : null}
          {error ? <StateMessage>Não foi possível carregar os cursos. {error}</StateMessage> : null}
          {data && data.length === 0 ? (
            <StateMessage>Nenhum curso publicado ainda.</StateMessage>
          ) : null}

          {data && data.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((course) => (
                <li key={course.id}>
                  <Link href={`/cursos/${course.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col gap-4 p-6 transition-colors group-hover:border-brand/60">
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                          <GraduationCap className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <LibrasBadge />
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        {course.description ? (
                          <p className="text-sm text-muted">{course.description}</p>
                        ) : null}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                        Começar
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
          ) : null}
        </section>
      </main>
    </div>
  );
}
