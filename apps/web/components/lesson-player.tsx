'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Captions, FileText, Paperclip, Target } from 'lucide-react';
import type { LessonDetail } from '@projetox/contracts';
import { LessonComplete } from './lesson-complete';
import { LessonExercises } from './lesson-exercises';
import { LessonVideoStage } from './lesson-video-stage';
import { Card, LibrasBadge, SectionHeading } from './ui';

export function LessonPlayer({ lesson }: { lesson: LessonDetail }) {
  const support =
    lesson.translations.find((t) => t.languageCode === 'pt-BR') ?? lesson.translations[0] ?? null;
  const title = support?.title ?? lesson.slug;
  const objectives = support?.objectives ?? [];

  return (
    <article className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-3">
        <Link
          href={`/cursos/${lesson.courseSlug}`}
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao curso
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <LibrasBadge />
        </div>
        {support?.summary ? <p className="text-muted">{support.summary}</p> : null}
      </div>

      <LessonVideoStage videos={lesson.videos} title={title} />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <LessonComplete lessonId={lesson.id} courseSlug={lesson.courseSlug} />

        {objectives.length > 0 ? (
          <section aria-labelledby="obj-h" className="flex flex-col gap-3">
            <div id="obj-h">
              <SectionHeading icon={<Target className="h-5 w-5" />}>Objetivos</SectionHeading>
            </div>
            <ul className="flex flex-col gap-2">
              {objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-brand" aria-hidden="true">
                    ✓
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {support?.bodyMarkdown ? (
          <section aria-labelledby="txt-h" className="flex flex-col gap-3">
            <div id="txt-h">
              <SectionHeading icon={<BookOpen className="h-5 w-5" />}>Conteúdo</SectionHeading>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-ink/90">
              {support.bodyMarkdown}
            </div>
          </section>
        ) : null}

        {support?.caption ? (
          <Card className="p-0">
            <details className="p-4">
              <summary className="flex cursor-pointer items-center gap-2 font-medium">
                <Captions className="h-4 w-4 text-brand" aria-hidden="true" />
                Legenda
              </summary>
              <p className="mt-2 whitespace-pre-wrap text-muted">{support.caption}</p>
            </details>
          </Card>
        ) : null}

        {support?.transcript ? (
          <Card className="p-0">
            <details className="p-4">
              <summary className="flex cursor-pointer items-center gap-2 font-medium">
                <FileText className="h-4 w-4 text-brand" aria-hidden="true" />
                Transcrição
              </summary>
              <p className="mt-2 whitespace-pre-wrap text-muted">{support.transcript}</p>
            </details>
          </Card>
        ) : null}

        {lesson.materials.length > 0 ? (
          <section aria-labelledby="mat-h" className="flex flex-col gap-3">
            <div id="mat-h">
              <SectionHeading icon={<Paperclip className="h-5 w-5" />}>Materiais</SectionHeading>
            </div>
            <ul className="flex flex-col gap-2">
              {lesson.materials.map((m) => (
                <li key={m.id}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand hover:underline"
                  >
                    <Paperclip className="h-4 w-4" aria-hidden="true" />
                    {m.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <LessonExercises lessonId={lesson.id} />
      </div>
    </article>
  );
}
