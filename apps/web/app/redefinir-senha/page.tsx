'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/auth-shell';
import { Field, FormError, PasswordStrength, SubmitButton } from '@/components/form';
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

    if (password.length < 8) {
      setError('Sua nova senha precisa ter pelo menos 8 caracteres.');
      return;
    }

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
        label="Nova senha"
        type="password"
        value={password}
        onChange={setPassword}
        required
        minLength={8}
        autoComplete="new-password"
        placeholder="Crie uma nova senha segura"
      />
      {password ? <PasswordStrength value={password} /> : null}
      <FormError message={error} />
      <SubmitButton loading={loading}>Redefinir senha</SubmitButton>
    </form>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <AuthShell
      title="Redefinir senha"
      subtitle="Crie uma nova senha para continuar"
      footer={
        <Link href="/entrar" className="font-medium text-brand hover:underline">
          Voltar para entrar
        </Link>
      }
    >
      <Suspense fallback={<p className="text-muted">Carregando…</p>}>
        <ResetForm />
      </Suspense>
    </AuthShell>
  );
}
