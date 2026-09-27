'use client';

import { Hand, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { resolveLibras } from '@/lib/libras-glossary';

/**
 * Termo com explicação em Libras: mostra o texto normalmente e, ao passar o
 * mouse, focar (teclado) ou tocar, abre um popup com um vídeo curto em Libras.
 */
export function LibrasTerm({ id, children }: { id: string; children: React.ReactNode }) {
  const entry = resolveLibras(id);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popId = useId();

  useEffect(() => setMounted(true), []);

  const W = 300;

  const place = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const left = Math.max(12, Math.min(r.left, window.innerWidth - W - 12));
    // abre abaixo; se não couber, abre acima
    const below = r.bottom + 8;
    const spaceBelow = window.innerHeight - r.bottom;
    const top = spaceBelow < 260 ? Math.max(12, r.top - 260) : below;
    setPos({ top, left });
  }, []);

  const doOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    place();
    setOpen(true);
  }, [place]);

  const doClose = useCallback(() => setOpen(false), []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        anchorRef.current?.focus();
      }
    };
    const onScroll = () => setOpen(false);
    const onClickOutside = (e: MouseEvent) => {
      if (
        !popRef.current?.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  // Termo desconhecido: mostra o texto normal, sem quebrar a aula.
  if (!entry) return <>{children}</>;

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        aria-label={`Ver "${entry.term}" em Libras`}
        aria-expanded={open}
        aria-controls={open ? popId : undefined}
        onMouseEnter={doOpen}
        onMouseLeave={scheduleClose}
        onFocus={doOpen}
        onBlur={scheduleClose}
        onClick={() => (open ? doClose() : doOpen())}
        className="group mx-0.5 inline-flex items-baseline gap-0.5 rounded font-medium text-brand underline decoration-dotted decoration-brand/60 underline-offset-4 hover:decoration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {children}
        <Hand className="h-3 w-3 translate-y-0.5" aria-hidden="true" />
      </button>

      {mounted && open && pos
        ? createPortal(
            <div
              ref={popRef}
              id={popId}
              role="dialog"
              aria-label={`${entry.term} em Libras`}
              onMouseEnter={doOpen}
              onMouseLeave={scheduleClose}
              style={{ position: 'fixed', top: pos.top, left: pos.left, width: W }}
              className="z-50 overflow-hidden rounded-2xl border border-edge bg-card shadow-2xl glow-brand"
            >
              <div className="flex items-center justify-between gap-2 border-b border-edge bg-elevated px-3 py-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  <Hand className="h-4 w-4" aria-hidden="true" />
                  {entry.term} em Libras
                </span>
                <button
                  type="button"
                  onClick={doClose}
                  aria-label="Fechar"
                  className="rounded p-0.5 text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <video
                src={entry.video}
                className="aspect-video w-full bg-black"
                autoPlay
                muted
                loop
                playsInline
                controls
                aria-label={`Vídeo em Libras: ${entry.term}`}
              />
              {entry.note ? <p className="px-3 py-2 text-sm text-muted">{entry.note}</p> : null}
              <p className="px-3 pb-2 text-[11px] text-muted/70">vídeo de exemplo — placeholder</p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
