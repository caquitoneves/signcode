'use client';

import { Eye, EyeOff, Hand, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { LessonVideo } from '@projetox/contracts';
import { Button } from './ui';
import { VideoEmbed } from './video-embed';

function byRole(videos: LessonVideo[], role: string): LessonVideo | null {
  return videos.find((v) => v.role === role) ?? null;
}

export function LessonVideoStage({ videos, title }: { videos: LessonVideo[]; title: string }) {
  const content = byRole(videos, 'CONTENT');
  const instructor = byRole(videos, 'INSTRUCTOR');
  const interpreter = byRole(videos, 'INTERPRETER');

  const [showInstructor, setShowInstructor] = useState(true);
  const [showInterpreter, setShowInterpreter] = useState(true);

  useEffect(() => {
    try {
      const a = window.localStorage.getItem('showInstructor');
      if (a !== null) setShowInstructor(a === '1');
      const b = window.localStorage.getItem('showInterpreter');
      if (b !== null) setShowInterpreter(b === '1');
    } catch {
      // localStorage indisponível
    }
  }, []);

  function persist(key: string, value: boolean): void {
    try {
      window.localStorage.setItem(key, value ? '1' : '0');
    } catch {
      // ignora
    }
  }

  const main = content ?? instructor ?? interpreter;
  const mainMuted = main?.role !== 'INSTRUCTOR';

  const hasInstructorSide = Boolean(instructor && instructor !== main);
  const hasInterpreterSide = Boolean(interpreter && interpreter !== main);

  const secondaries: LessonVideo[] = [];
  if (hasInstructorSide && showInstructor && instructor) secondaries.push(instructor);
  if (hasInterpreterSide && showInterpreter && interpreter) secondaries.push(interpreter);
  const hasSide = secondaries.length > 0;

  return (
    <section aria-label="Vídeos da aula" className="flex flex-col gap-3">
      {hasInstructorSide || hasInterpreterSide ? (
        <div className="flex flex-wrap items-center gap-2">
          {hasInstructorSide ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowInstructor((v) => {
                  persist('showInstructor', !v);
                  return !v;
                });
              }}
              aria-pressed={showInstructor}
            >
              {showInstructor ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <User className="h-4 w-4" aria-hidden="true" />
              {showInstructor ? 'Ocultar professor' : 'Mostrar professor'}
            </Button>
          ) : null}
          {hasInterpreterSide ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowInterpreter((v) => {
                  persist('showInterpreter', !v);
                  return !v;
                });
              }}
              aria-pressed={showInterpreter}
            >
              {showInterpreter ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <Hand className="h-4 w-4" aria-hidden="true" />
              {showInterpreter ? 'Ocultar intérprete' : 'Mostrar intérprete'}
            </Button>
          ) : null}
        </div>
      ) : null}

      <div className={hasSide ? 'grid gap-3 lg:grid-cols-[1fr_20rem]' : 'grid gap-3'}>
        <VideoEmbed
          video={main}
          title={`${title} — conteúdo`}
          autoplay
          muted={mainMuted}
          aspect="video"
        />
        {hasSide ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {secondaries.map((v) => (
              <VideoEmbed
                key={v.role}
                video={v}
                title={`${title} — ${v.role === 'INTERPRETER' ? 'intérprete de Libras' : 'professor'}`}
                autoplay
                muted={v.role !== 'INSTRUCTOR'}
                aspect="portrait"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
