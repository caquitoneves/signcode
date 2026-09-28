'use client';

import Link from 'next/link';
import { CheckCircle2, PlayCircle } from 'lucide-react';
import type { CourseTree, CourseTreeLesson } from '@signcode/contracts';
import { formatDuration } from '@/lib/format';
import { Card } from './ui';

function lessonTitle(lesson: CourseTreeLesson): string {
  return (
    lesson.translations.find((t) => t.languageCode === 'pt-BR')?.title ??
    lesson.translations[0]?.title ??
    lesson.slug
  );
}

export function LessonSidebar({
  course,
  done,
  currentLessonId,
  autoplay,
  onToggleAutoplay,
}: {
  course: CourseTree | null;
  done: Set<string>;
  currentLessonId: string;
  autoplay: boolean;
  onToggleAutoplay: () => void;
}) {
  return (
    <Card className="flex h-fit flex-col overflow-hidden lg:sticky lg:top-20">
      <div className="flex items-center justify-between gap-2 border-b border-edge px-4 py-3">
        <span className="font-semibold">Aulas</span>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={autoplay}
            onChange={onToggleAutoplay}
            className="h-4 w-4 accent-[var(--color-brand)]"
          />
          Reprodução automática
        </label>
      </div>

      <div className="max-h-[65vh] overflow-y-auto">
        {!course ? (
          <p className="px-4 py-4 text-sm text-muted">Carregando aulas…</p>
        ) : (
          course.modules.map((mod) => (
            <div key={mod.id}>
              <p className="bg-elevated/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {mod.title}
              </p>
              <ul>
                {mod.lessons.map((lesson) => {
                  const current = lesson.id === currentLessonId;
                  const isDone = done.has(lesson.id);
                  const duration = formatDuration(lesson.durationSeconds);
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/aulas/${lesson.id}`}
                        aria-current={current ? 'true' : undefined}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                          current
                            ? 'border-l-2 border-brand bg-brand/10 text-brand'
                            : 'border-l-2 border-transparent hover:bg-elevated'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlayCircle className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                        )}
                        <span className="flex-1">{lessonTitle(lesson)}</span>
                        {duration ? <span className="text-xs text-muted">{duration}</span> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
