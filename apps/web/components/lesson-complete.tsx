'use client';

import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { progressApi } from '../lib/progress-api';
import { Button, Card } from './ui';

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
      <Card className="px-4 py-3 text-sm text-muted">
        Quer salvar seu progresso?{' '}
        <Link href="/entrar" className="font-medium text-brand hover:underline">
          Entre
        </Link>{' '}
        ou{' '}
        <Link href="/cadastro" className="font-medium text-brand hover:underline">
          crie uma conta
        </Link>
        .
      </Card>
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
      // mantém estado atual
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant={completed ? 'success' : 'primary'}
      onClick={() => void toggle()}
      disabled={busy || !ready}
      aria-pressed={completed}
      className="w-fit"
    >
      {completed ? (
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Circle className="h-4 w-4" aria-hidden="true" />
      )}
      {completed ? 'Aula concluída' : 'Marcar como concluída'}
    </Button>
  );
}
