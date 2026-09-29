'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/auth-shell';
import { CheckboxField, Field, FormError, SubmitButton } from '@/components/form';
import { useAuth } from '@/lib/auth-context';

export default function EntrarPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password, remember);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Entrar"
      subtitle="Bem-vindo de volta"
      footer={
        <span>
          Não tem conta?{' '}
          <Link href="/cadastro" className="font-medium text-brand hover:underline">
            Criar conta
          </Link>
        </span>
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
          placeholder="seu@email.com"
        />
        <Field
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between gap-3">
          <CheckboxField checked={remember} onChange={setRemember} label="Lembrar de mim" />
          <Link href="/recuperar-senha" className="text-sm text-muted hover:text-brand">
            Esqueci a senha
          </Link>
        </div>

        <FormError message={error} />
        <SubmitButton loading={loading}>Entrar</SubmitButton>
      </form>
    </AuthShell>
  );
}
