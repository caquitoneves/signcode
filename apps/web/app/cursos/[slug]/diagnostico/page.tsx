'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Compass } from 'lucide-react';
import { Suspense, useState } from 'react';
import type { AssessmentPublic } from '@signcode/contracts';
import { StateMessage } from '@/components/state-message';
import { Button, Card } from '@/components/ui';
import { cn } from '@signcode/ui';
import { useAuth } from '@/lib/auth-context';
import { experienceApi } from '@/lib/experience-api';
import { useFetch } from '@/lib/use-fetch';

function markDone(slug: string): void {
  try {
    window.localStorage.setItem(`signcode:diag-done:${slug}`, '1');
  } catch {
    // ignora
  }
}

function DiagnosticoInner() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || `/cursos/${slug}`;
  const { user } = useAuth();
  const { data, error, loading } = useFetch<AssessmentPublic | null>(
    () => experienceApi.getAssessment(slug),
    [slug],
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function submit(): Promise<void> {
    if (!data) return;
    setBusy(true);
    try {
      await experienceApi.respondAssessment(data.id, 'BEFORE', answers);
      markDone(slug);
      router.replace(next);
    } catch {
      setBusy(false);
    }
  }

  const answered = data ? data.questions.filter((q) => answers[q.id]).length : 0;

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-10">
        <Link
          href={`/cursos/${slug}`}
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao curso
        </Link>

        {loading ? <StateMessage>Carregando…</StateMessage> : null}
        {error ? <StateMessage>Não foi possível carregar o diagnóstico.</StateMessage> : null}
        {!loading && !data ? (
          <StateMessage>Este curso ainda não tem um diagnóstico.</StateMessage>
        ) : null}

        {data ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-brand" aria-hidden="true" />
                <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{data.title}</h1>
              </div>
              {data.description ? <p className="text-muted">{data.description}</p> : null}
              <p className="text-sm text-muted">
                {answered} de {data.questions.length} respondidas
              </p>
            </div>

            {!user ? (
              <Card className="p-4 text-sm text-muted">
                <Link href="/entrar" className="font-medium text-brand hover:underline">
                  Entre
                </Link>{' '}
                para registrar suas respostas — assim comparamos seu antes e depois.
              </Card>
            ) : null}

            <ol className="flex flex-col gap-4">
              {data.questions.map((q, qi) => (
                <li
                  key={q.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${qi * 40}ms` }}
                >
                  <Card className="flex flex-col gap-3 p-5">
                    <p className="font-medium">
                      {qi + 1}. {q.prompt}
                    </p>
                    {q.kind === 'TEXT' ? (
                      <textarea
                        value={answers[q.id] ?? ''}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                        rows={3}
                        className="w-full rounded-xl border border-edge bg-elevated px-3 py-2 text-ink placeholder:text-muted/60 transition-colors focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        placeholder="Escreva aqui…"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((o) => {
                          const chosen = answers[q.id] === o.id;
                          return (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                              className={cn(
                                'rounded-xl border px-3 py-2 text-sm transition-all active:scale-95',
                                chosen
                                  ? 'border-brand bg-brand/10 text-brand'
                                  : 'border-edge text-muted hover:border-brand/40 hover:text-ink',
                              )}
                            >
                              {o.text}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Card>
                </li>
              ))}
            </ol>

            <div className="flex items-center gap-3">
              <Button onClick={() => void submit()} disabled={!user || busy}>
                {busy ? 'Enviando…' : 'Enviar e começar'}
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default function DiagnosticoPage() {
  return (
    <Suspense fallback={<StateMessage>Carregando…</StateMessage>}>
      <DiagnosticoInner />
    </Suspense>
  );
}
