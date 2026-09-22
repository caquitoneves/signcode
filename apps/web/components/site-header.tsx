'use client';

import Link from 'next/link';
import { useAuth } from '../lib/auth-context';

export function SiteHeader() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Aprender <span className="text-indigo-600 dark:text-indigo-400">em Libras</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-neutral-600 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-300 dark:hover:text-white"
          >
            Cursos
          </Link>

          {loading ? null : user ? (
            <>
              <Link
                href="/painel"
                className="text-neutral-700 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-200 dark:hover:text-white"
              >
                Meu painel
              </Link>
              <span className="hidden text-neutral-500 sm:inline" aria-label="Conectado como">
                {user.name ?? user.email}
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className="rounded-md px-3 py-1.5 font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/entrar"
                className="text-neutral-700 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-200"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar conta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
