'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Hand } from 'lucide-react';
import { cn } from '@projetox/ui';

type Variant = 'primary' | 'secondary' | 'ghost' | 'success';
type Size = 'sm' | 'md';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-60';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-brand-fg hover:bg-brand-strong',
  secondary: 'border border-edge bg-elevated text-ink hover:border-brand/60',
  ghost: 'text-muted hover:bg-elevated hover:text-ink',
  success: 'bg-emerald-500 text-emerald-950 hover:bg-emerald-600',
};

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: { variant?: Variant; size?: Size } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('rounded-2xl border border-edge bg-card', className)}>{children}</div>;
}

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-edge bg-elevated px-2.5 py-0.5 text-xs font-medium text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LibrasBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-brand',
        className,
      )}
    >
      <Hand className="h-3.5 w-3.5" aria-hidden="true" />
      Libras
    </span>
  );
}

export function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-elevated', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand to-emerald-400 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SectionHeading({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
      <span className="text-brand" aria-hidden="true">
        {icon}
      </span>
      {children}
    </h2>
  );
}
