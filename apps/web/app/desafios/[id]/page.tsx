'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Code2 } from 'lucide-react';
import { CodePlayground } from '@/components/code-playground';
import { DetailSkeleton, ErrorState } from '@/components/skeleton';
import { useChallenge } from '@/lib/queries';

export default function DesafioPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError, refetch } = useChallenge(id);

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 py-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar aos cursos
        </Link>

        {isPending ? <DetailSkeleton cards={1} /> : null}
        {isError ? (
          <ErrorState
            message="Não foi possível carregar o desafio."
            onRetry={() => void refetch()}
          />
        ) : null}

        {data ? (
          <div className="flex animate-fade-in flex-col gap-5">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-violet-600" aria-hidden="true" />
              <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
            </div>
            <p className="text-muted">{data.instructions}</p>
            <CodePlayground
              starterCode={data.starterCode}
              tests={data.tests}
              storageKey={`desafio-${id}`}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}
