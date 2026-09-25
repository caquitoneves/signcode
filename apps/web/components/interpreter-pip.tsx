'use client';

import { Hand, Maximize2, Minimize2, X } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { LessonVideo } from '@projetox/contracts';
import { VideoEmbed } from './video-embed';

/** Janela flutuante do intérprete de Libras: arrastável e ocultável. */
export function InterpreterPiP({
  video,
  title,
  onClose,
}: {
  video: LessonVideo;
  title: string;
  onClose: () => void;
}) {
  const [big, setBig] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 24, y: 24 });
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const width = big ? 360 : 240;

  useEffect(() => {
    // posição inicial: canto inferior direito
    setPos({ x: window.innerWidth - width - 24, y: window.innerHeight - width * 0.66 - 24 });
  }, []);

  function clamp(x: number, y: number): { x: number; y: number } {
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 60;
    return { x: Math.max(8, Math.min(maxX, x)), y: Math.max(8, Math.min(maxY, y)) };
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>): void {
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>): void {
    if (!drag.current) return;
    setPos(clamp(e.clientX - drag.current.dx, e.clientY - drag.current.dy));
  }
  function onPointerUp(): void {
    drag.current = null;
  }

  return (
    <div
      className="fixed z-50 overflow-hidden rounded-xl border border-edge bg-card shadow-2xl"
      style={{ left: pos.x, top: pos.y, width }}
    >
      <div
        className="flex cursor-move touch-none items-center justify-between gap-2 bg-elevated px-2 py-1"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
          <Hand className="h-3.5 w-3.5" aria-hidden="true" />
          Libras
        </span>
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setBig((v) => !v)}
            aria-label={big ? 'Diminuir intérprete' : 'Aumentar intérprete'}
            className="rounded p-1 text-muted hover:bg-card hover:text-ink"
          >
            {big ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Ocultar intérprete"
            className="rounded p-1 text-muted hover:bg-card hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>
      <VideoEmbed video={video} title={title} autoplay muted />
    </div>
  );
}
