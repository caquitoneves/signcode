'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Captions,
  FileText,
  Hand,
  Lightbulb,
  LightbulbOff,
  Maximize2,
  Minimize2,
  Paperclip,
  Star,
  Target,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { CourseTree, LessonDetail } from '@projetox/contracts';
import { cn } from '@projetox/ui';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { progressApi } from '@/lib/progress-api';
import { InterpreterPiP } from './interpreter-pip';
import { LessonComplete } from './lesson-complete';
import { LessonExercises } from './lesson-exercises';
import { LessonSidebar } from './lesson-sidebar';
import { Button, Card, LibrasBadge, SectionHeading } from './ui';
import { VideoEmbed } from './video-embed';

type Tool = 'none' | 'caption' | 'transcript' | 'materials';

function ToolButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        active ? 'bg-brand/15 text-brand' : 'text-muted hover:bg-elevated hover:text-ink',
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function LessonPlayer({ lesson }: { lesson: LessonDetail }) {
  const { user } = useAuth();

  const support =
    lesson.translations.find((t) => t.languageCode === 'pt-BR') ?? lesson.translations[0] ?? null;
  const title = support?.title ?? lesson.slug;
  const objectives = support?.objectives ?? [];

  const content =
    lesson.videos.find((v) => v.role === 'CONTENT') ??
    lesson.videos.find((v) => v.role === 'INSTRUCTOR') ??
    null;
  const interpreter = lesson.videos.find((v) => v.role === 'INTERPRETER') ?? null;

  const [course, setCourse] = useState<CourseTree | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [dim, setDim] = useState(false);
  const [showInterpreter, setShowInterpreter] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [rating, setRating] = useState(0);
  const [tool, setTool] = useState<Tool>('none');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const i = window.localStorage.getItem('showInterpreter');
      if (i !== null) setShowInterpreter(i === '1');
      const a = window.localStorage.getItem('autoplay');
      if (a !== null) setAutoplay(a === '1');
    } catch {
      // ignora
    }
  }, []);

  useEffect(() => {
    let ok = true;
    api
      .getCourse(lesson.courseSlug)
      .then((c) => {
        if (ok) setCourse(c);
      })
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, [lesson.courseSlug]);

  useEffect(() => {
    let ok = true;
    if (!user) {
      setDone(new Set());
      return;
    }
    progressApi
      .getCourseProgress(lesson.courseSlug)
      .then((p) => {
        if (ok) setDone(new Set(p.completedLessonIds));
      })
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, [user, lesson.courseSlug]);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  function persist(key: string, value: boolean): void {
    try {
      window.localStorage.setItem(key, value ? '1' : '0');
    } catch {
      // ignora
    }
  }

  async function toggleFullscreen(): Promise<void> {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stageRef.current) await stageRef.current.requestFullscreen();
    } catch {
      // indisponível
    }
  }

  const flat = course ? course.modules.flatMap((m) => m.lessons) : [];
  const idx = flat.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? (flat[idx - 1] ?? null) : null;
  const next = idx >= 0 && idx < flat.length - 1 ? (flat[idx + 1] ?? null) : null;

  return (
    <>
      {dim ? (
        <div
          className="fixed inset-0 z-30 bg-black/85"
          onClick={() => setDim(false)}
          aria-hidden="true"
        />
      ) : null}

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <Link
            href={`/cursos/${lesson.courseSlug}`}
            className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao curso
          </Link>

          <div
            ref={stageRef}
            className={cn('relative flex flex-col gap-3 bg-canvas', dim && 'z-40')}
          >
            <VideoEmbed
              video={content}
              title={`${title} — aula`}
              autoplay
              muted={false}
              className={isFullscreen ? 'max-h-[86vh]' : undefined}
            />
            {interpreter && showInterpreter ? (
              <InterpreterPiP
                video={interpreter}
                title={`${title} — intérprete de Libras`}
                onClose={() => {
                  setShowInterpreter(false);
                  persist('showInterpreter', false);
                }}
              />
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <LibrasBadge />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center" role="group" aria-label="Avaliar aula">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={`Avaliar com ${n} de 5`}
                    className="p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <Star
                      className={cn(
                        'h-5 w-5',
                        n <= rating ? 'fill-brand text-brand' : 'text-muted',
                      )}
                    />
                  </button>
                ))}
              </div>
              {interpreter && !showInterpreter ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setShowInterpreter(true);
                    persist('showInterpreter', true);
                  }}
                >
                  <Hand className="h-4 w-4" />
                  Intérprete
                </Button>
              ) : null}
              <Button variant="secondary" size="sm" onClick={() => setDim((v) => !v)}>
                {dim ? <Lightbulb className="h-4 w-4" /> : <LightbulbOff className="h-4 w-4" />}
                {dim ? 'Acender luz' : 'Apagar luz'}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => void toggleFullscreen()}>
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
                {isFullscreen ? 'Sair' : 'Tela cheia'}
              </Button>
            </div>
          </div>

          {support?.summary ? <p className="text-muted">{support.summary}</p> : null}

          <LessonComplete lessonId={lesson.id} courseSlug={lesson.courseSlug} />

          {/* Barra de ferramentas */}
          {support?.caption || support?.transcript || lesson.materials.length > 0 ? (
            <div className="flex flex-wrap gap-1 border-y border-edge py-2">
              {support?.caption ? (
                <ToolButton
                  active={tool === 'caption'}
                  onClick={() => setTool((t) => (t === 'caption' ? 'none' : 'caption'))}
                  icon={<Captions className="h-4 w-4" />}
                >
                  Legenda
                </ToolButton>
              ) : null}
              {support?.transcript ? (
                <ToolButton
                  active={tool === 'transcript'}
                  onClick={() => setTool((t) => (t === 'transcript' ? 'none' : 'transcript'))}
                  icon={<FileText className="h-4 w-4" />}
                >
                  Transcrição
                </ToolButton>
              ) : null}
              {lesson.materials.length > 0 ? (
                <ToolButton
                  active={tool === 'materials'}
                  onClick={() => setTool((t) => (t === 'materials' ? 'none' : 'materials'))}
                  icon={<Paperclip className="h-4 w-4" />}
                >
                  Materiais
                </ToolButton>
              ) : null}
            </div>
          ) : null}

          {tool === 'caption' && support?.caption ? (
            <Card className="whitespace-pre-wrap p-4 text-muted">{support.caption}</Card>
          ) : null}
          {tool === 'transcript' && support?.transcript ? (
            <Card className="whitespace-pre-wrap p-4 text-muted">{support.transcript}</Card>
          ) : null}
          {tool === 'materials' && lesson.materials.length > 0 ? (
            <Card className="flex flex-col gap-2 p-4">
              {lesson.materials.map((m) => (
                <a
                  key={m.id}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:underline"
                >
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                  {m.title}
                </a>
              ))}
            </Card>
          ) : null}

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

          <LessonExercises lessonId={lesson.id} />

          <div className="flex items-center justify-between gap-2 border-t border-edge pt-4">
            {prev ? (
              <Link href={`/aulas/${prev.id}`}>
                <Button variant="secondary" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/aulas/${next.id}`}>
                <Button size="sm">
                  Próxima aula
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>

        <LessonSidebar
          course={course}
          done={done}
          currentLessonId={lesson.id}
          autoplay={autoplay}
          onToggleAutoplay={() => {
            setAutoplay((v) => {
              persist('autoplay', !v);
              return !v;
            });
          }}
        />
      </div>
    </>
  );
}
