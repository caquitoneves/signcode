import { Hand } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card } from './ui';

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center gap-6 px-6 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/40">
          <Hand className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
        </div>
      </div>
      <Card className="p-6">{children}</Card>
      {footer ? <div className="text-center text-sm text-muted">{footer}</div> : null}
    </main>
  );
}
