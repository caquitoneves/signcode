'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ClipboardCheck, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { CheckpointPublic, CheckpointResult } from '@projetox/contracts';
import { Confetti } from '@/components/confetti';
import { StateMessage } from '@/components/state-message';
import { Button, Card } from '@/components/ui';
import { cn } from '@projetox/ui';
import { experienceApi } from '@/lib/experience-api';
import { useFetch } from '@/lib/use-fetch';

export default function CheckpointPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useFetch<CheckpointPublic>(
    () => experienceApi.getCheckpoint(id),
    [id],
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CheckpointResult | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(): Promise<void> {
    if (!data) return;
    setBusy(true);
    try {
      const payload = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      }));
      setResult(await experienceApi.submitCheckpoint(id, payload));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // silencioso: mantém o estado
    } finally {
      setBusy(false);
    }
  }

  const correctionFor = (qid: string) => result?.corrections.find((c) => c.questionId === qid);
  const allAnswered = data ? data.questions.every((q) => answers[q.id]) : false;

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-10">
        <Confetti fire={Boolean(result?.passed)} />
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar aos cursos
        </Link>

        {loading ? <StateMessage>Carregando…</StateMessage> : null}
        {error ? <StateMessage>Não foi possível carregar o checkpoint.</StateMessage> : null}

        {data ? (
          <>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-6 w-6 text-brand" aria-hidden="true" />
              <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
            </div>
            {data.description ? <p className="text-muted">{data.description}</p> : null}

            {result ? (
              <Card
                className={cn(
                  'flex items-center gap-3 p-4',
                  result.passed ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-edge',
                )}
              >
                {result.passed ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                ) : (
                  <XCircle className="h-6 w-6 text-muted" aria-hidden="true" />
                )}
                <div>
                  <p className="font-semibold">
                    {result.score} de {result.total} corretas
                  </p>
                  <p className="text-sm text-muted">
                    {result.passed
                      ? 'Muito bem! Você concluiu este checkpoint.'
                      : 'Reveja as explicações e tente de novo quando quiser.'}
                  </p>
                </div>
              </Card>
            ) : null}

            <ol className="stagger-children flex flex-col gap-4">
              {data.questions.map((q, qi) => {
                const corr = correctionFor(q.id);
                return (
                  <li key={q.id}>
                    <Card className="flex flex-col gap-3 p-5">
                      <p className="font-medium">
                        {qi + 1}. {q.prompt}
                      </p>
                      <div className="flex flex-col gap-2">
                        {q.options.map((o) => {
                          const chosen = answers[q.id] === o.id;
                          const isCorrect = corr?.correctOptionId === o.id;
                          const showState = Boolean(result);
                          return (
                            <label
                              key={o.id}
                              className={cn(
                                'flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors',
                                showState && isCorrect
                                  ? 'border-emerald-500/50 bg-emerald-500/10'
                                  : showState && chosen && !isCorrect
                                    ? 'border-red-500/40 bg-red-500/10'
                                    : chosen
                                      ? 'border-brand bg-brand/10'
                                      : 'border-edge hover:border-brand/40',
                              )}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={o.id}
                                checked={chosen}
                                disabled={Boolean(result)}
                                onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                                className="accent-brand"
                              />
                              <span className="flex-1">{o.text}</span>
                              {showState && isCorrect ? (
                                <CheckCircle2
                                  className="h-4 w-4 text-emerald-400"
                                  aria-hidden="true"
                                />
                              ) : null}
                            </label>
                          );
                        })}
                      </div>
                      {result && corr?.explanation ? (
                        <p className="rounded-lg bg-elevated px-3 py-2 text-sm text-muted">
                          {corr.explanation}
                        </p>
                      ) : null}
                    </Card>
                  </li>
                );
              })}
            </ol>

            {!result ? (
              <Button
                onClick={() => void submit()}
                disabled={!allAnswered || busy}
                className="w-fit"
              >
                {busy ? 'Enviando…' : 'Enviar respostas'}
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                }}
                className="w-fit"
              >
                Refazer
              </Button>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}
