'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Field, FormError, SubmitButton } from '@/components/form';
import { useAuth } from '@/lib/auth-context';

export default function EntrarPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Entrar</h1>
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
        <Field
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
        />
        <FormError message={error} />
        <SubmitButton loading={loading}>Entrar</SubmitButton>
      </form>
      <div className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-300">
        <Link
          href="/recuperar-senha"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Esqueci minha senha
        </Link>
        <span>
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Criar conta
          </Link>
        </span>
      </div>
    </main>
  );
}
