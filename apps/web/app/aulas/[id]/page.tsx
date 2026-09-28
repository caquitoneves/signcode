'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LessonPlayer } from '@/components/lesson-player';
import { ErrorState, LessonSkeleton } from '@/components/skeleton';
import { useAuth } from '@/lib/auth-context';
import { experienceApi } from '@/lib/experience-api';
import { useLesson } from '@/lib/queries';

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data, isError, isPending, refetch } = useLesson(id);
  const [gate, setGate] = useState<'checking' | 'open'>('checking');

  useEffect(() => {
    if (authLoading || isPending) return;
    if (isError || !data) return;
    // Sem login não há diagnóstico a fazer.
    if (!user) {
      setGate('open');
      return;
    }
    // Atalho: já respondeu neste navegador.
    let doneFlag = false;
    try {
      doneFlag = window.localStorage.getItem(`signcode:diag-done:${data.courseSlug}`) === '1';
    } catch {
      // ignora
    }
    if (doneFlag) {
      setGate('open');
      return;
    }
    let ok = true;
    setGate('checking');
    experienceApi
      .getAssessmentStatus(data.courseSlug)
      .then((st) => {
        if (!ok) return;
        if (st.assessmentId && !st.respondedBefore) {
          router.replace(
            `/cursos/${data.courseSlug}/diagnostico?next=${encodeURIComponent(`/aulas/${id}`)}`,
          );
        } else {
          try {
            window.localStorage.setItem(`signcode:diag-done:${data.courseSlug}`, '1');
          } catch {
            // ignora
          }
          setGate('open');
        }
      })
      .catch(() => setGate('open'));
    return () => {
      ok = false;
    };
  }, [authLoading, isPending, isError, data, user, id, router]);

  if (isPending || authLoading || gate === 'checking') {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <LessonSkeleton />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <ErrorState message="Não foi possível carregar a aula." onRetry={() => void refetch()} />
      </main>
    );
  }

  return <LessonPlayer lesson={data} />;
}
