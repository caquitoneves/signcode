'use client';

import { useState, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@signcode/ui';
import { Button } from './ui';

export function CheckboxField({
  checked,
  onChange,
  label,
  helperText,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  helperText?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-edge bg-elevated px-3 py-2.5 text-sm text-ink transition-colors hover:border-brand/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-edge bg-card text-brand focus:ring-brand"
      />
      <span className="flex min-w-0 flex-col">
        <span className="font-medium">{label}</span>
        {helperText ? <span className="text-xs text-muted">{helperText}</span> : null}
      </span>
    </label>
  );
}

export function Field(props: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  placeholder?: string;
}) {
  const {
    id,
    label,
    type = 'text',
    value,
    onChange,
    required,
    autoComplete,
    minLength,
    placeholder,
  } = props;
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && show ? 'text' : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl border border-edge bg-elevated px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
            isPassword && 'pr-12',
          )}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {show ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function SubmitButton({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? 'Enviando…' : children}
    </Button>
  );
}

export function PasswordStrength({ value }: { value: string }) {
  const score = Math.min(
    4,
    [value.length >= 8, /[A-Z]/.test(value), /\d/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length,
  );

  const label =
    score <= 1 ? 'Muito fraca' : score === 2 ? 'Fraca' : score === 3 ? 'Boa' : 'Forte';

  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span>Segurança da senha</span>
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className={cn(
              'h-1.5 flex-1 rounded-full',
              item < score ?
                score <= 1 ? 'bg-red-400' : score === 2 ? 'bg-amber-400' : score === 3 ? 'bg-sky-400' : 'bg-emerald-500' :
                'bg-slate-200',
            )}
          />
        ))}
      </div>
      <span className="font-medium text-ink">{label}</span>
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

export function FormSuccess({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="status"
      className="flex items-start gap-2 rounded-xl border border-brand/40 bg-brand/10 px-3 py-2 text-sm text-brand"
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}
