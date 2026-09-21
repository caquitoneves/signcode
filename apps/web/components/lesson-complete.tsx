'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@projetox/ui';
import { useAuth } from '../lib/auth-context';
import { progressApi } from '../lib/progress-api';

export function LessonComplete({ lessonId, courseSlug }: { lessonId: string; courseSlug: string }) {
  const { user, loading: authLoading } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    if (!user) {
      setReady(true);
      return;
    }
    setReady(false);
    progressApi
      .getCourseProgress(courseSlug)
      .then((p) => {
        if (active) {
          setCompleted(p.completedLessonIds.includes(lessonId));
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [user, courseSlug, lessonId]);

  if (authLoading) return null;

  if (!user) {
    return (
      <p className="rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
        Quer salvar seu progresso?{' '}
        <Link href="/entrar" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Entre
        </Link>{' '}
        ou{' '}
        <Link href="/cadastro" className="text-indigo-600 hover:underline dark:text-indigo-400">
          crie uma conta
        </Link>
        .
      </p>
    );
  }

  async function toggle(): Promise<void> {
    setBusy(true);
    try {
      if (completed) {
        await progressApi.uncomplete(lessonId);
        setCompleted(false);
      } else {
        await progressApi.complete(lessonId);
        setCompleted(true);
      }
    } catch {
      // mantém estado atual em caso de erro
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={busy || !ready}
      aria-pressed={completed}
      className={cn(
        'w-fit rounded-md px-4 py-2 font-medium text-white transition-colors disabled:opacity-60',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        completed ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700',
      )}
    >
      {completed ? '✓ Aula concluída' : 'Marcar como concluída'}
    </button>
  );
}
