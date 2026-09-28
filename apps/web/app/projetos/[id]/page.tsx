'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, FolderGit2, Rocket } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { ProjectSubmissionResult } from '@signcode/contracts';
import { Markdown } from '@/components/markdown';
import { DetailSkeleton, ErrorState } from '@/components/skeleton';
import { Field } from '@/components/form';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/lib/auth-context';
import { experienceApi } from '@/lib/experience-api';
import { useProject } from '@/lib/queries';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data, isPending, isError, refetch } = useProject(id);

  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState<ProjectSubmissionResult | null>(null);
  const [busy, setBusy] = useState(false);

  const loadSubmission = useCallback(async () => {
    if (!user) return;
    try {
      const s = await experienceApi.getProjectSubmission(id);
      if (s) {
        setSaved(s);
        setRepoUrl(s.repoUrl ?? '');
        setLiveUrl(s.liveUrl ?? '');
        setNotes(s.notes ?? '');
      }
    } catch {
      // ignora
    }
  }, [user, id]);

  useEffect(() => {
    void loadSubmission();
  }, [loadSubmission]);

  async function submit(): Promise<void> {
    setBusy(true);
    try {
      setSaved(await experienceApi.submitProject(id, { repoUrl, liveUrl, notes }));
    } catch {
      // ignora
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar aos cursos
        </Link>

        {isPending ? <DetailSkeleton cards={2} /> : null}
        {isError ? (
          <ErrorState
            message="Não foi possível carregar o projeto."
            onRetry={() => void refetch()}
          />
        ) : null}

        {data ? (
          <div className="flex animate-fade-in flex-col gap-6">
            <div className="flex items-center gap-2">
              {data.kind === 'FINAL' ? (
                <Rocket className="h-6 w-6 text-brand" aria-hidden="true" />
              ) : (
                <FolderGit2 className="h-6 w-6 text-rose-600" aria-hidden="true" />
              )}
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{data.title}</h1>
            </div>

            <Card className="p-5">
              <Markdown content={data.brief} />
            </Card>

            {data.requirements.length > 0 ? (
              <section className="flex flex-col gap-2">
                <h2 className="font-semibold">Requisitos</h2>
                <ul className="stagger-children flex flex-col gap-2">
                  {data.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink/90">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${data.kind === 'FINAL' ? 'text-brand' : 'text-rose-600'}`}
                        aria-hidden="true"
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <Card className="flex flex-col gap-4 p-5">
              <h2 className="font-semibold">Sua entrega</h2>
              {!user ? (
                <p className="text-sm text-muted">
                  <Link href="/entrar" className="font-medium text-brand hover:underline">
                    Entre
                  </Link>{' '}
                  para salvar o link do seu projeto.
                </p>
              ) : (
                <>
                  <Field
                    id="repoUrl"
                    label="Link do repositório (GitHub)"
                    value={repoUrl}
                    onChange={setRepoUrl}
                    placeholder="https://github.com/voce/projeto"
                  />
                  <Field
                    id="liveUrl"
                    label="Link do projeto publicado (opcional)"
                    value={liveUrl}
                    onChange={setLiveUrl}
                    placeholder="https://voce.github.io/projeto"
                  />
                  <Field id="notes" label="Notas (opcional)" value={notes} onChange={setNotes} />
                  <div className="flex items-center gap-3">
                    <Button onClick={() => void submit()} disabled={busy} className="w-fit">
                      {busy ? 'Salvando…' : saved ? 'Atualizar entrega' : 'Enviar entrega'}
                    </Button>
                    {saved ? (
                      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Entrega salva
                      </span>
                    ) : null}
                  </div>
                </>
              )}
            </Card>
          </div>
        ) : null}
      </div>
    </main>
  );
}
