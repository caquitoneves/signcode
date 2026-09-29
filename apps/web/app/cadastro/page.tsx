'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/auth-shell';
import { CheckboxField, Field, FormError, PasswordStrength, SubmitButton } from '@/components/form';
import { useAuth } from '@/lib/auth-context';

export default function CadastroPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    return [hasLength, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
  }, [password]);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);

    if (!acceptTerms) {
      setError('Você precisa aceitar os termos para continuar.');
      return;
    }

    if (passwordStrength < 3) {
      setError('Sua senha precisa ter pelo menos 8 caracteres e conter letras e números.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name || undefined, remember);
      router.push(`/verificar-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Comece sua jornada com SignCode"
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
          placeholder="Como você gostaria de ser chamado?"
        />
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
        <div className="flex flex-col gap-2">
          <Field
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Crie uma senha segura"
          />
          {password ? <PasswordStrength value={password} /> : null}
        </div>

        <CheckboxField checked={remember} onChange={setRemember} label="Lembrar de mim" />

        <CheckboxField
          checked={acceptTerms}
          onChange={setAcceptTerms}
          label="Aceito os termos e políticas"
        />

        <FormError message={error} />
        <SubmitButton loading={loading}>Criar conta</SubmitButton>
      </form>
    </AuthShell>
  );
}
