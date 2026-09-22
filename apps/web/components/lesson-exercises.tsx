'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import type { ExercisePublic, ExerciseSubmissionResult } from '@projetox/contracts';
import { cn } from '@projetox/ui';
import { useAuth } from '../lib/auth-context';
import { exercisesApi } from '../lib/exercises-api';

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
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
    >
      {isMultipleChoice ? (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">{exercise.prompt}</legend>
          {exercise.options.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2">
              <input
                type="radio"
                name={exercise.id}
                value={opt.id}
                checked={optionId === opt.id}
                onChange={() => setOptionId(opt.id)}
                className="h-4 w-4"
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
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
      )}

      {canSubmit ? (
        <button
          type="submit"
          disabled={busy || (isMultipleChoice ? !optionId : text.trim().length === 0)}
          className="w-fit rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {busy ? 'Enviando…' : 'Responder'}
        </button>
      ) : (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          <Link href="/entrar" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Entre
          </Link>{' '}
          para responder e receber feedback.
        </p>
      )}

      <div aria-live="polite">
        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
        {result ? (
          <div
            className={cn(
              'rounded-md px-3 py-2 text-sm',
              result.correct
                ? 'bg-green-50 text-green-800 dark:bg-green-950/60 dark:text-green-300'
                : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
            )}
          >
            <p className="font-medium">
              {result.correct ? '✓ Correto!' : 'Ainda não. Tente de novo.'}
            </p>
            {result.explanation ? <p className="mt-1">{result.explanation}</p> : null}
          </div>
        ) : null}
      </div>
    </form>
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
      <h2 id="ex-h" className="text-lg font-semibold">
        Exercícios
      </h2>
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
