'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Code2, LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@signcode/ui';
import { useAuth } from '../lib/auth-context';
import { LogoMark } from './logo';
import { Button } from './ui';

function NavLink({
  href,
  active,
  light,
  icon,
  children,
  className,
}: {
  href: string;
  active: boolean;
  light: boolean;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        active
          ? light
            ? 'bg-brand/10 font-medium text-brand-strong'
            : 'bg-brand/10 font-medium text-brand'
          : light
            ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            : 'text-muted hover:bg-elevated hover:text-ink',
        className,
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname() ?? '/';
  const light = pathname === '/';

  const isCourses =
    pathname === '/' || pathname.startsWith('/cursos') || pathname.startsWith('/aulas');
  const isPratica = pathname.startsWith('/pratica');
  const isPainel = pathname.startsWith('/painel');

  return (
    <header
      className={cn(
        'sticky top-0 z-20 border-b backdrop-blur',
        light ? 'border-slate-200 bg-white/85' : 'border-edge bg-canvas/80',
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="SignCode — início"
          className="group flex min-w-0 shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <LogoMark className="h-9 w-9 shrink-0" title="Símbolo SignCode" />
          <span className={cn('hidden font-semibold tracking-tight min-[380px]:inline', light ? 'text-slate-900' : '')}>
            Sign<span className="text-brand">Code</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="flex min-w-0 items-center gap-1 text-sm">
          <NavLink
            href="/"
            active={isCourses}
            light={light}
            icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
            className="hidden sm:inline-flex"
          >
            Cursos
          </NavLink>
          <NavLink
            href="/pratica"
            active={isPratica}
            light={light}
            icon={<Code2 className="h-4 w-4" aria-hidden="true" />}
            className="hidden sm:inline-flex"
          >
            Praticar
          </NavLink>

          {loading ? null : user ? (
            <>
              <NavLink
                href="/painel"
                active={isPainel}
                light={light}
                icon={<LayoutDashboard className="h-4 w-4" aria-hidden="true" />}
              >
                Meu painel
              </NavLink>
              <span
                className={cn(
                  'hidden max-w-[12rem] truncate px-2 md:inline',
                  light ? 'text-slate-500' : 'text-muted',
                )}
                title={user.email}
              >
                {user.name ?? user.email}
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  light
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    : 'text-muted hover:bg-elevated hover:text-ink',
                )}
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink
                href="/entrar"
                active={pathname.startsWith('/entrar')}
                light={light}
                icon={<LogIn className="h-4 w-4" aria-hidden="true" />}
              >
                Entrar
              </NavLink>
              <Link href="/cadastro">
                <Button size="sm">
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
