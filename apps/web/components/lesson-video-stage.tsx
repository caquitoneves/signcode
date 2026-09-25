'use client';

import { Eye, EyeOff, Hand, Maximize2, Minimize2, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { LessonVideo } from '@projetox/contracts';
import { Button } from './ui';
import { VideoEmbed } from './video-embed';

function byRole(videos: LessonVideo[], role: string): LessonVideo | null {
  return videos.find((v) => v.role === role) ?? null;
}

function SideTile({
  video,
  label,
  icon,
  title,
}: {
  video: LessonVideo;
  label: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-xs font-medium text-muted">
        <span className="text-brand" aria-hidden="true">
          {icon}
        </span>
        {label}
      </span>
      <VideoEmbed video={video} title={title} autoplay muted={video.role !== 'INSTRUCTOR'} />
    </div>
  );
}

export function LessonVideoStage({ videos, title }: { videos: LessonVideo[]; title: string }) {
  const content = byRole(videos, 'CONTENT');
  const instructor = byRole(videos, 'INSTRUCTOR');
  const interpreter = byRole(videos, 'INTERPRETER');

  const [showInstructor, setShowInstructor] = useState(true);
  const [showInterpreter, setShowInterpreter] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

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
      // fullscreen indisponível
    }
  }

  const main = content ?? instructor ?? interpreter;
  const mainMuted = main?.role !== 'INSTRUCTOR';

  const hasInstructorSide = Boolean(instructor && instructor !== main);
  const hasInterpreterSide = Boolean(interpreter && interpreter !== main);
  const sideVisible =
    (hasInstructorSide && showInstructor) || (hasInterpreterSide && showInterpreter);

  return (
    <div ref={stageRef} className="flex flex-col gap-3 bg-canvas">
      <div className="flex flex-wrap items-center justify-between gap-2">
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
              Professor
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
              Intérprete
            </Button>
          ) : null}
        </div>
        <Button variant="secondary" size="sm" onClick={() => void toggleFullscreen()}>
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {isFullscreen ? 'Sair' : 'Tela cheia'}
        </Button>
      </div>

      <div
        className={
          sideVisible ? 'grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_15rem]' : 'grid gap-3'
        }
      >
        <VideoEmbed
          video={main}
          title={`${title} — conteúdo`}
          autoplay
          muted={mainMuted}
          className={isFullscreen ? 'max-h-[88vh]' : undefined}
        />

        {sideVisible ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {hasInstructorSide && showInstructor && instructor ? (
              <SideTile
                video={instructor}
                label="Professor"
                icon={<User className="h-3.5 w-3.5" />}
                title={`${title} — professor`}
              />
            ) : null}
            {hasInterpreterSide && showInterpreter && interpreter ? (
              <SideTile
                video={interpreter}
                label="Intérprete de Libras"
                icon={<Hand className="h-3.5 w-3.5" />}
                title={`${title} — intérprete de Libras`}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
