import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aprender tecnologia em Libras',
  description: 'Educação em tecnologia com Libras como língua de ensino de primeira classe.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link
              href="/"
              className="font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Aprender <span className="text-indigo-600 dark:text-indigo-400">em Libras</span>
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-300 dark:hover:text-white"
            >
              Cursos
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
