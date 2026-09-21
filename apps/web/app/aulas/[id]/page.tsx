'use client';

import { useParams } from 'next/navigation';
import { LessonPlayer } from '@/components/lesson-player';
import { StateMessage } from '@/components/state-message';
import { api } from '@/lib/api';
import { useFetch } from '@/lib/use-fetch';

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, error, loading } = useFetch(() => api.getLesson(id), [id]);

  if (loading) {
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
