'use client';

import { Hand, X } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { LessonVideo } from '@projetox/contracts';
import { VideoEmbed } from './video-embed';

/** Janela flutuante do intérprete de Libras: arrastável, redimensionável e ocultável. */
export function InterpreterPiP({
  video,
  title,
  onClose,
}: {
  video: LessonVideo;
  title: string;
  onClose: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 24, y: 24 });
  const [width, setWidth] = useState(280);
  const move = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{ startX: number; startW: number } | null>(null);

  useEffect(() => {
    setPos({ x: window.innerWidth - width - 24, y: window.innerHeight - width * 0.66 - 24 });
    // posição inicial no canto inferior direito (apenas na montagem)
  }, []);

  function clampPos(x: number, y: number): { x: number; y: number } {
    return {
      x: Math.max(8, Math.min(window.innerWidth - 80, x)),
      y: Math.max(8, Math.min(window.innerHeight - 60, y)),
    };
  }
  function clampWidth(w: number): number {
    return Math.max(160, Math.min(w, Math.min(720, window.innerWidth - 40)));
  }

  function onMoveDown(e: ReactPointerEvent<HTMLDivElement>): void {
    move.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onMoveMove(e: ReactPointerEvent<HTMLDivElement>): void {
    if (!move.current) return;
    setPos(clampPos(e.clientX - move.current.dx, e.clientY - move.current.dy));
  }
  function onMoveUp(): void {
    move.current = null;
  }

  function onResizeDown(e: ReactPointerEvent<HTMLDivElement>): void {
    e.stopPropagation();
    resize.current = { startX: e.clientX, startW: width };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onResizeMove(e: ReactPointerEvent<HTMLDivElement>): void {
    if (!resize.current) return;
    setWidth(clampWidth(resize.current.startW + (e.clientX - resize.current.startX)));
  }
  function onResizeUp(): void {
    resize.current = null;
  }

  return (
    <div
      className="fixed z-50 select-none overflow-hidden rounded-xl border border-edge bg-card shadow-2xl"
      style={{ left: pos.x, top: pos.y, width }}
    >
      <div
        className="flex cursor-move touch-none items-center justify-between gap-2 bg-elevated px-2 py-1"
        onPointerDown={onMoveDown}
        onPointerMove={onMoveMove}
        onPointerUp={onMoveUp}
      >
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
          <Hand className="h-3.5 w-3.5" aria-hidden="true" />
          Libras
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Ocultar intérprete"
          className="rounded p-1 text-muted hover:bg-card hover:text-ink"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative">
        <VideoEmbed video={video} title={title} autoplay muted />
        <div
          role="slider"
          aria-label="Redimensionar intérprete"
          aria-valuenow={width}
          tabIndex={-1}
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-se-resize touch-none"
          style={{
            background:
              'linear-gradient(135deg, transparent 0 50%, var(--color-brand) 50% 60%, transparent 60% 70%, var(--color-brand) 70% 80%, transparent 80%)',
          }}
        />
      </div>
    </div>
  );
}
