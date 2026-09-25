'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Captions, FileText, Hand, Paperclip, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { LessonDetail } from '@projetox/contracts';
import { cn } from '@projetox/ui';
import { languageLabel, orderLanguages } from '../lib/languages';
import { LessonComplete } from './lesson-complete';
import { LessonExercises } from './lesson-exercises';
import { Card, LibrasBadge, SectionHeading } from './ui';
import { VideoEmbed } from './video-embed';

const PREF_KEY = 'preferredLessonLanguage';

export function LessonPlayer({ lesson }: { lesson: LessonDetail }) {
  const videoLangs = useMemo(
    () => orderLanguages(lesson.videos.map((v) => v.languageCode)),
    [lesson.videos],
  );

  const [lang, setLang] = useState<string>(() => videoLangs[0] ?? 'libras');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PREF_KEY);
      if (saved && videoLangs.includes(saved)) setLang(saved);
    } catch {
      // localStorage indisponível
    }
  }, [videoLangs]);

  function chooseLang(next: string): void {
    setLang(next);
    try {
      window.localStorage.setItem(PREF_KEY, next);
    } catch {
      // ignora
    }
  }

  const currentVideo = lesson.videos.find((v) => v.languageCode === lang) ?? null;
  const support =
    lesson.translations.find((t) => t.languageCode === 'pt-BR') ?? lesson.translations[0] ?? null;
  const langTranslation = lesson.translations.find((t) => t.languageCode === lang) ?? null;
  const title = support?.title ?? lesson.slug;
  const objectives = support?.objectives ?? [];

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10">
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

      {/* Vídeo + idioma */}
      <section aria-label="Vídeo da aula" className="flex flex-col gap-3">
        {videoLangs.length > 0 ? (
          <div
            role="group"
            aria-label="Idioma do vídeo"
            className="flex w-fit gap-1 rounded-xl border border-edge bg-card p-1"
          >
            {videoLangs.map((code) => {
              const active = code === lang;
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseLang(code)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    active ? 'bg-brand text-brand-fg' : 'text-muted hover:text-ink',
                  )}
                >
                  {code === 'libras' ? <Hand className="h-4 w-4" aria-hidden="true" /> : null}
                  {languageLabel(code)}
                </button>
              );
            })}
          </div>
        ) : null}
        <VideoEmbed video={currentVideo} title={`${title} — ${languageLabel(lang)}`} />
      </section>

      <LessonComplete lessonId={lesson.id} courseSlug={lesson.courseSlug} />

      {objectives.length > 0 ? (
        <section aria-labelledby="obj-h" className="flex flex-col gap-3">
          <div id="obj-h">
            <SectionHeading icon={<Target className="h-5 w-5" />}>Objetivos</SectionHeading>
          </div>
          <ul className="flex flex-col gap-2 text-muted">
            {objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-brand" aria-hidden="true">
                  ✓
                </span>
                <span className="text-ink">{o}</span>
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

      {langTranslation?.caption ? (
        <Card className="p-0">
          <details className="group p-4">
            <summary className="flex cursor-pointer items-center gap-2 font-medium">
              <Captions className="h-4 w-4 text-brand" aria-hidden="true" />
              Legenda ({languageLabel(lang)})
            </summary>
            <p className="mt-2 whitespace-pre-wrap text-muted">{langTranslation.caption}</p>
          </details>
        </Card>
      ) : null}

      {langTranslation?.transcript ? (
        <Card className="p-0">
          <details className="group p-4">
            <summary className="flex cursor-pointer items-center gap-2 font-medium">
              <FileText className="h-4 w-4 text-brand" aria-hidden="true" />
              Transcrição ({languageLabel(lang)})
            </summary>
            <p className="mt-2 whitespace-pre-wrap text-muted">{langTranslation.transcript}</p>
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
    </article>
  );
}
