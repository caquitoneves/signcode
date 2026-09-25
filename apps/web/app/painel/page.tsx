'use client';

import Link from 'next/link';
import { ArrowRight, GraduationCap, LayoutDashboard } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { DashboardCourse } from '@projetox/contracts';
import { EmptyArt } from '@/components/illustrations';
import { StateMessage } from '@/components/state-message';
import { Button, Card, ProgressBar } from '@/components/ui';
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
      <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
        <LayoutDashboard className="h-7 w-7 text-brand" aria-hidden="true" />
        Meu painel
      </h1>

      {authLoading || loading ? <StateMessage>Carregando…</StateMessage> : null}

      {!authLoading && !loading && !user ? (
        <StateMessage>
          Entre para ver seu painel.{' '}
          <Link href="/entrar" className="font-medium text-brand hover:underline">
            Entrar
          </Link>
        </StateMessage>
      ) : null}

      {error ? <StateMessage>{error}</StateMessage> : null}

      {user && items && items.length === 0 ? (
        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <EmptyArt />
          <div className="flex flex-col gap-1">
            <p className="font-medium">Você ainda não está matriculado em nenhum curso.</p>
            <p className="text-sm text-muted">Escolha um curso e comece a aprender.</p>
          </div>
          <Link href="/">
            <Button>Ver cursos</Button>
          </Link>
        </Card>
      ) : null}

      {user && items && items.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {items.map((item) => {
            const pct = percent(item);
            return (
              <li key={item.course.id}>
                <Card className="flex flex-col gap-4 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-1 flex-col gap-1">
                      <h2 className="font-semibold">{item.course.title}</h2>
                      {item.course.description ? (
                        <p className="text-sm text-muted">{item.course.description}</p>
                      ) : null}
                    </div>
                    <Link href={`/cursos/${item.course.slug}`}>
                      <Button size="sm">
                        Continuar
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm text-muted">
                      <span>
                        {item.completed} de {item.total} aulas
                      </span>
                      <span className="font-medium text-brand">{pct}%</span>
                    </div>
                    <ProgressBar value={item.completed} max={item.total} />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      ) : null}
    </main>
  );
}
