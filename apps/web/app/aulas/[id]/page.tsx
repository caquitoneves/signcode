'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LessonPlayer } from '@/components/lesson-player';
import { StateMessage } from '@/components/state-message';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { experienceApi } from '@/lib/experience-api';
import { useFetch } from '@/lib/use-fetch';

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data, error, loading } = useFetch(() => api.getLesson(id), [id]);
  const [gate, setGate] = useState<'checking' | 'open'>('checking');

  useEffect(() => {
    if (authLoading || loading) return;
    if (error || !data) return;
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
  }, [authLoading, loading, error, data, user, id, router]);

  if (loading || authLoading || gate === 'checking') {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <StateMessage>Carregando aula…</StateMessage>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <StateMessage>Não foi possível carregar a aula. {error ?? ''}</StateMessage>
      </main>
    );
  }

  return <LessonPlayer lesson={data} />;
}
