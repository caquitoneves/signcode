'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

const COLORS = ['#14b8a6', '#fb7185', '#38bdf8', '#fbbf24', '#a78bfa'];

/** Chuva de confete ao concluir algo. Dispara quando `fire` vira true; respeita reduzir movimento. */
export function Confetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!fire) return;
    let reduced = false;
    try {
      reduced =
        document.documentElement.classList.contains('reduce-motion') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      // ignora
    }
    if (reduced) return;
    const arr: Piece[] = Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 2.2 + Math.random() * 1.6,
      color: COLORS[i % COLORS.length]!,
      size: 6 + Math.random() * 7,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 4200);
    return () => clearTimeout(t);
  }, [fire]);

  if (pieces.length === 0 || typeof document === 'undefined') return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: 2,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
