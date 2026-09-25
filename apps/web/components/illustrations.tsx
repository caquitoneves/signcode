import { Captions, Hand, PlayCircle, Sparkles } from 'lucide-react';

export function HeroArt() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-edge bg-gradient-to-br from-brand/25 via-elevated to-canvas"
    >
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand/25 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/40">
          <Hand className="h-16 w-16 text-brand" />
        </div>
      </div>

      <div className="absolute left-6 top-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-edge bg-card shadow-lg">
        <Captions className="h-6 w-6 text-brand" />
      </div>
      <div className="absolute right-8 top-12 flex h-12 w-12 items-center justify-center rounded-2xl border border-edge bg-card shadow-lg">
        <Sparkles className="h-5 w-5 text-brand" />
      </div>
      <div className="absolute bottom-8 right-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-edge bg-card shadow-lg">
        <PlayCircle className="h-6 w-6 text-ink/80" />
      </div>
    </div>
  );
}

export function EmptyArt() {
  return (
    <div
      aria-hidden="true"
      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-edge bg-elevated"
    >
      <Sparkles className="h-9 w-9 text-brand" />
    </div>
  );
}
