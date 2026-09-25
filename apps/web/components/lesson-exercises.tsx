'use client';

import Link from 'next/link';
import { CheckCircle2, ListChecks, XCircle } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import type { ExercisePublic, ExerciseSubmissionResult } from '@projetox/contracts';
import { useAuth } from '../lib/auth-context';
import { exercisesApi } from '../lib/exercises-api';
import { Button, Card, SectionHeading } from './ui';

function ExerciseItem({ exercise, canSubmit }: { exercise: ExercisePublic; canSubmit: boolean }) {
  const [optionId, setOptionId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [result, setResult] = useState<ExerciseSubmissionResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMultipleChoice = exercise.type === 'MULTIPLE_CHOICE';

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const answer = isMultipleChoice ? { optionId: optionId ?? undefined } : { text };
      setResult(await exercisesApi.submit(exercise.id, answer));
    } catch {
      setError('Não foi possível enviar a resposta.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="p-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {isMultipleChoice ? (
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 font-medium">{exercise.prompt}</legend>
            {exercise.options.map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-edge bg-elevated px-3 py-2 transition-colors hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
              >
                <input
                  type="radio"
                  name={exercise.id}
                  value={opt.id}
                  checked={optionId === opt.id}
                  onChange={() => setOptionId(opt.id)}
                  className="h-4 w-4 accent-[var(--color-brand)]"
                />
                <span>{opt.text}</span>
              </label>
            ))}
          </fieldset>
        ) : (
          <div className="flex flex-col gap-2">
            <label htmlFor={`ex-${exercise.id}`} className="font-medium">
              {exercise.prompt}
            </label>
            <input
              id={`ex-${exercise.id}`}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-lg border border-edge bg-elevated px-3 py-2 text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              placeholder="Sua resposta"
            />
          </div>
        )}

        {canSubmit ? (
          <Button
            type="submit"
            size="sm"
            className="w-fit"
            disabled={busy || (isMultipleChoice ? !optionId : text.trim().length === 0)}
          >
            {busy ? 'Enviando…' : 'Responder'}
          </Button>
        ) : (
          <p className="text-sm text-muted">
            <Link href="/entrar" className="font-medium text-brand hover:underline">
              Entre
            </Link>{' '}
            para responder e receber feedback.
          </p>
        )}

        <div aria-live="polite">
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {result ? (
            <div
              className={
                result.correct
                  ? 'flex items-start gap-2 rounded-lg border border-brand/40 bg-brand/10 px-3 py-2 text-sm text-brand'
                  : 'flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-300'
              }
            >
              {result.correct ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>
                <span className="font-medium">
                  {result.correct ? 'Correto!' : 'Ainda não. Tente de novo.'}
                </span>
                {result.explanation ? (
                  <span className="block text-ink/80">{result.explanation}</span>
                ) : null}
              </span>
            </div>
          ) : null}
        </div>
      </form>
    </Card>
  );
}

export function LessonExercises({ lessonId }: { lessonId: string }) {
  const { user, loading: authLoading } = useAuth();
  const [exercises, setExercises] = useState<ExercisePublic[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    exercisesApi
      .listForLesson(lessonId)
      .then((data) => {
        if (active) {
          setExercises(data);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [lessonId]);

  if (!loaded || exercises.length === 0) return null;

  return (
    <section aria-labelledby="ex-h" className="flex flex-col gap-3">
      <div id="ex-h">
        <SectionHeading icon={<ListChecks className="h-5 w-5" />}>Exercícios</SectionHeading>
      </div>
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          canSubmit={!authLoading && Boolean(user)}
        />
      ))}
    </section>
  );
}
