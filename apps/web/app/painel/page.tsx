'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { DashboardCourse } from '@projetox/contracts';
import { StateMessage } from '@/components/state-message';
import { useAuth } from '@/lib/auth-context';
import { progressApi } from '@/lib/progress-api';

function percent(item: DashboardCourse): number {
  return item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
}

export default function PainelPage() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<DashboardCourse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setItems(await progressApi.getDashboard());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar o painel');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) void load();
  }, [authLoading, load]);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Meu painel</h1>

      {authLoading || loading ? <StateMessage>Carregando…</StateMessage> : null}

      {!authLoading && !loading && !user ? (
        <StateMessage>
          Entre para ver seu painel.{' '}
          <Link href="/entrar" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Entrar
          </Link>
        </StateMessage>
      ) : null}

      {error ? <StateMessage>{error}</StateMessage> : null}

      {user && items && items.length === 0 ? (
        <StateMessage>
          Você ainda não está matriculado em nenhum curso.{' '}
          <Link href="/" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Ver cursos
          </Link>
        </StateMessage>
      ) : null}

      {user && items && items.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {items.map((item) => {
            const pct = percent(item);
            return (
              <li
                key={item.course.id}
                className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold">{item.course.title}</h2>
                    {item.course.description ? (
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {item.course.description}
                      </p>
                    ) : null}
                  </div>
                  <Link
                    href={`/cursos/${item.course.slug}`}
                    className="shrink-0 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Continuar
                  </Link>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-300">
                    <span>
                      {item.completed} de {item.total} aulas
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={item.total}
                    aria-valuenow={item.completed}
                  >
                    <div
                      className="h-full bg-green-600 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </main>
  );
}
