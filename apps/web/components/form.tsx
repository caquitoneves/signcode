'use client';

import type { ReactNode } from 'react';
import { cn } from '@projetox/ui';

export function Field(props: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
}) {
  const { id, label, type = 'text', value, onChange, required, autoComplete, minLength } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
      />
    </div>
  );
}

export function SubmitButton({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        'rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      )}
    >
      {loading ? 'Enviando…' : children}
    </button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/60 dark:text-red-300"
    >
      {message}
    </p>
  );
}

export function FormSuccess({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="status"
      className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/60 dark:text-green-300"
    >
      {message}
    </p>
  );
}
