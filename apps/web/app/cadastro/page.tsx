'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/auth-shell';
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
      // conta nova -> onboarding acessível
      router.push('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Comece a aprender em Libras"
      footer={
        <span>
          Já tem conta?{' '}
          <Link href="/entrar" className="font-medium text-brand hover:underline">
            Entrar
          </Link>
        </span>
      }
    >
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
    </AuthShell>
  );
}
