'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/auth-shell';
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
    <AuthShell
      title="Recuperar senha"
      subtitle="Enviaremos um link por e-mail"
      footer={
        <Link href="/entrar" className="font-medium text-brand hover:underline">
          Voltar para entrar
        </Link>
      }
    >
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
    </AuthShell>
  );
}
