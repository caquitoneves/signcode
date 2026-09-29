'use client';

import { Code2 } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { experienceApi } from '@/lib/experience-api';
import type { TestCase } from '@/lib/use-code-runner';
import { CodePlayground } from './code-playground';

export interface ChallengeData {
  id?: string;
  instructions?: string;
  starter?: string;
  tests?: TestCase[];
}

/** Desafio de código embutido na aula (renderizado a partir de um bloco ```challenge). */
export function LessonChallenge({ data }: { data: ChallengeData }) {
  const { user } = useAuth();
  // Registra a submissão apenas na primeira vez que o aluno passa (evita spam de POSTs).
  const submittedRef = useRef(false);

  const handleResult = useCallback(
    (passed: boolean, code: string) => {
      if (!user || !data.id || !passed || submittedRef.current) return;
      submittedRef.current = true;
      void experienceApi.submitChallenge(data.id, code, true).catch(() => {
        submittedRef.current = false; // libera nova tentativa se a submissão falhar
      });
    },
    [user, data.id],
  );

  return (
    <div className="my-2 flex flex-col gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4">
      <div className="flex items-start gap-2">
        <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-ink">Desafio de código</span>
          {data.instructions ? <p className="text-sm text-muted">{data.instructions}</p> : null}
        </div>
      </div>
      <CodePlayground
        starterCode={data.starter ?? ''}
        tests={data.tests ?? []}
        storageKey={data.id}
        height="240px"
        onResult={handleResult}
      />
    </div>
  );
}
