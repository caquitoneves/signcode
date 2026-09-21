'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Field, FormError, FormSuccess, SubmitButton } from '@/components/form';
import { authApi } from '@/lib/auth-api';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Recuperar senha</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <FormError message={error} />
        <FormSuccess
          message={
            done ? 'Se houver uma conta com esse e-mail, enviaremos um link de recuperação.' : null
          }
        />
        <SubmitButton loading={loading}>Enviar link</SubmitButton>
      </form>
      <p className="text-sm">
        <Link href="/entrar" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Voltar para entrar
        </Link>
      </p>
    </main>
  );
}
