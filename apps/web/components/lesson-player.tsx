'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { LessonDetail } from '@projetox/contracts';
import { cn } from '@projetox/ui';
import { languageLabel, orderLanguages } from '../lib/languages';
import { LessonComplete } from './lesson-complete';
import { VideoEmbed } from './video-embed';

const PREF_KEY = 'preferredLessonLanguage';

export function LessonPlayer({ lesson }: { lesson: LessonDetail }) {
  const videoLangs = useMemo(
    () => orderLanguages(lesson.videos.map((v) => v.languageCode)),
    [lesson.videos],
  );

  // Libras primeiro por padrão (língua de ensino de 1ª classe).
  const [lang, setLang] = useState<string>(() => videoLangs[0] ?? 'libras');

  // Aplica preferência salva (somente no cliente), se válida.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PREF_KEY);
      if (saved && videoLangs.includes(saved)) setLang(saved);
    } catch {
      // localStorage indisponível — segue com o padrão.
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
      <div className="flex flex-col gap-2">
        <Link
          href={`/cursos/${lesson.courseSlug}`}
          className="w-fit text-sm text-indigo-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
        >
          ← Voltar ao curso
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {support?.summary ? (
          <p className="text-neutral-600 dark:text-neutral-300">{support.summary}</p>
        ) : null}
      </div>

      {/* Vídeo (Libras é o padrão) + escolha de idioma do vídeo */}
      <section aria-label="Vídeo da aula" className="flex flex-col gap-3">
        {videoLangs.length > 0 ? (
          <div role="group" aria-label="Idioma do vídeo" className="flex flex-wrap gap-2">
            {videoLangs.map((code) => {
              const active = code === lang;
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseLang(code)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700',
                  )}
                >
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
        <section aria-labelledby="obj-h" className="flex flex-col gap-2">
          <h2 id="obj-h" className="text-lg font-semibold">
            Objetivos
          </h2>
          <ul className="flex flex-col gap-1 text-neutral-700 dark:text-neutral-300">
            {objectives.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true">✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {support?.bodyMarkdown ? (
        <section aria-labelledby="txt-h" className="flex flex-col gap-2">
          <h2 id="txt-h" className="text-lg font-semibold">
            Conteúdo
          </h2>
          <div className="whitespace-pre-wrap leading-relaxed text-neutral-800 dark:text-neutral-200">
            {support.bodyMarkdown}
          </div>
        </section>
      ) : null}

      {langTranslation?.caption ? (
        <details className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <summary className="cursor-pointer font-medium">Legenda ({languageLabel(lang)})</summary>
          <p className="mt-2 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
            {langTranslation.caption}
          </p>
        </details>
      ) : null}

      {langTranslation?.transcript ? (
        <details className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <summary className="cursor-pointer font-medium">
            Transcrição ({languageLabel(lang)})
          </summary>
          <p className="mt-2 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
            {langTranslation.transcript}
          </p>
        </details>
      ) : null}

      {lesson.materials.length > 0 ? (
        <section aria-labelledby="mat-h" className="flex flex-col gap-2">
          <h2 id="mat-h" className="text-lg font-semibold">
            Materiais
          </h2>
          <ul className="flex flex-col gap-1">
            {lesson.materials.map((m) => (
              <li key={m.id}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
                >
                  {m.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
