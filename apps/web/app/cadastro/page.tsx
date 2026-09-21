'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Field, FormError, SubmitButton } from '@/components/form';
import { useAuth } from '@/lib/auth-context';

export default function CadastroPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, name || undefined);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Criar conta</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field
          id="name"
          label="Nome (opcional)"
          value={name}
          onChange={setName}
          autoComplete="name"
        />
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
          label="Senha (mín. 8 caracteres)"
          type="password"
          value={password}
          onChange={setPassword}
          required
          minLength={8}
          autoComplete="new-password"
        />
        <FormError message={error} />
        <SubmitButton loading={loading}>Criar conta</SubmitButton>
      </form>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Já tem conta?{' '}
        <Link href="/entrar" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Entrar
        </Link>
      </p>
    </main>
  );
}
