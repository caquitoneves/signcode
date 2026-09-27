'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Code2, Hand, LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@projetox/ui';
import { useAuth } from '../lib/auth-context';
import { Button } from './ui';

function NavLink({
  href,
  active,
  icon,
  children,
  className,
}: {
  href: string;
  active: boolean;
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
          ? 'bg-brand/10 font-medium text-brand'
          : 'text-muted hover:bg-elevated hover:text-ink',
        className,
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname() ?? '/';

  const isCourses =
    pathname === '/' || pathname.startsWith('/cursos') || pathname.startsWith('/aulas');
  const isPratica = pathname.startsWith('/pratica');
  const isPainel = pathname.startsWith('/painel');

  return (
    <header className="sticky top-0 z-20 border-b border-edge bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/40">
            <Hand className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight">
            Aprender <span className="text-brand">em Libras</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <NavLink
            href="/"
            active={isCourses}
            icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
            className="hidden sm:inline-flex"
          >
            Cursos
          </NavLink>
          <NavLink
            href="/pratica"
            active={isPratica}
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
                icon={<LayoutDashboard className="h-4 w-4" aria-hidden="true" />}
              >
                Meu painel
              </NavLink>
              <span
                className="hidden max-w-[12rem] truncate px-2 text-muted md:inline"
                title={user.email}
              >
                {user.name ?? user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={() => void logout()}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <NavLink
                href="/entrar"
                active={pathname.startsWith('/entrar')}
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
