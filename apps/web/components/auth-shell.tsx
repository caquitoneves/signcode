import Link from 'next/link';
import type { ReactNode } from 'react';
import { LogoMark } from './logo';

/** Layout minimalista para telas de autenticação: um cartão centrado. */
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
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Link
            href="/"
            aria-label="SignCode — início"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <LogoMark className="h-10 w-10" />
          </Link>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
          </div>
        </div>

        <div className="rounded-2xl border border-edge bg-card p-6 shadow-sm">{children}</div>

        {footer ? <div className="mt-6 text-center text-sm text-muted">{footer}</div> : null}
      </div>
    </main>
  );
}
