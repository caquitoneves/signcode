'use client';

import Link from 'next/link';
import { BookOpen, Hand, LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { Button } from './ui';

export function SiteHeader() {
  const { user, loading, logout } = useAuth();

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
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted transition-colors hover:bg-elevated hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:inline-flex"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Cursos
          </Link>

          {loading ? null : user ? (
            <>
              <Link
                href="/painel"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted transition-colors hover:bg-elevated hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Meu painel
              </Link>
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
              <Link
                href="/entrar"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted transition-colors hover:bg-elevated hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Entrar
              </Link>
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
