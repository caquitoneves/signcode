'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Loader2,
  MailCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { AuthShell } from '@/components/auth-shell';
import { Button } from '@/components/ui';
import { authApi } from '@/lib/auth-api';
import { showToast } from '@/lib/toast';

type Status = 'idle' | 'verifying' | 'ok' | 'error';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email') ?? '';
  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'idle');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) return;
    let active = true;
    authApi
      .verifyEmail(token)
      .then(() => active && setStatus('ok'))
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, [token]);

  async function resend(): Promise<void> {
    setResending(true);
    try {
      await authApi.resendVerification();
      showToast({
        title: 'E-mail reenviado',
        description: 'Confira sua caixa de entrada (e o spam).',
        variant: 'success',
      });
    } catch {
      showToast({
        title: 'Não foi possível reenviar',
        description: 'Entre na sua conta e tente novamente.',
        variant: 'error',
      });
    } finally {
      setResending(false);
    }
  }

  // Fluxo do link de verificação (?token=...)
  if (token) {
    if (status === 'verifying') {
      return (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-brand" aria-hidden="true" />
          <p className="text-muted">Verificando seu e-mail…</p>
        </div>
      );
    }
    if (status === 'ok') {
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center rounded-2xl bg-emerald-500/10 p-4 text-emerald-600 ring-1 ring-emerald-500/20">
            <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
          </div>
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-ink">E-mail verificado!</h2>
            <p className="text-sm leading-relaxed text-muted">
              Tudo certo. Sua conta está confirmada.
            </p>
          </div>
          <Button type="button" className="w-full" onClick={() => router.push('/onboarding')}>
            Continuar para o onboarding
          </Button>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center rounded-2xl bg-coral/10 p-4 text-coral ring-1 ring-coral/20">
          <XCircle className="h-10 w-10" aria-hidden="true" />
        </div>
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Link inválido ou expirado</h2>
          <p className="text-sm leading-relaxed text-muted">
            O link pode ter expirado. Entre na sua conta e reenvie a verificação.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-1">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => void resend()}
            disabled={resending}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {resending ? 'Reenviando…' : 'Reenviar verificação'}
          </Button>
          <Link
            href="/painel"
            className="text-center text-sm font-medium text-muted hover:text-brand"
          >
            Ir para o app
          </Link>
        </div>
      </div>
    );
  }

  // Tela pós-cadastro (sem token): confira o e-mail + reenviar
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center rounded-2xl bg-brand/10 p-4 text-brand ring-1 ring-brand/20">
        <MailCheck className="h-10 w-10" aria-hidden="true" />
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Verifique seu e-mail</h2>
        <p className="text-sm leading-relaxed text-muted">
          Enviamos um link de confirmação para{' '}
          <span className="font-semibold text-ink">{email || 'seu e-mail'}</span>. Confirmar o
          endereço ajuda a manter sua conta segura.
        </p>
      </div>

      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 text-sm text-muted">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <p>
            Você já pode continuar para o onboarding — a verificação pode ser feita a qualquer
            momento pelo link do e-mail.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <Button type="button" className="w-full" onClick={() => router.push('/onboarding')}>
          Continuar para o onboarding
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => void resend()}
          disabled={resending}
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {resending ? 'Reenviando…' : 'Reenviar e-mail'}
        </Button>
      </div>

      <p className="text-center text-xs text-muted lg:text-left">
        Não recebeu? Verifique o spam ou reenvie em alguns minutos.
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Conta criada"
      subtitle="Quase lá"
      footer={
        <span className="inline-flex items-center gap-2 text-muted">
          <Sparkles className="h-4 w-4 text-brand" aria-hidden="true" />
          Segurança e acessibilidade em primeiro lugar
        </span>
      }
    >
      <Suspense fallback={<p className="text-muted">Carregando…</p>}>
        <VerifyEmailContent />
      </Suspense>
    </AuthShell>
  );
}
