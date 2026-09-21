'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, type FormEvent } from 'react';
import { Field, FormError, SubmitButton } from '@/components/form';
import { authApi } from '@/lib/auth-api';

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.resetPassword({ token, password });
      router.push('/entrar');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível redefinir a senha');
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return <FormError message="Link inválido: token ausente." />;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field
        id="password"
        label="Nova senha (mín. 8 caracteres)"
        type="password"
        value={password}
        onChange={setPassword}
        required
        minLength={8}
        autoComplete="new-password"
      />
      <FormError message={error} />
      <SubmitButton loading={loading}>Redefinir senha</SubmitButton>
    </form>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Redefinir senha</h1>
      <Suspense fallback={<p>Carregando…</p>}>
        <ResetForm />
      </Suspense>
      <p className="text-sm">
        <Link href="/entrar" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Voltar para entrar
        </Link>
      </p>
    </main>
  );
}
