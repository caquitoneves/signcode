'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MailCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import { AuthShell } from '@/components/auth-shell';
import { Button } from '@/components/ui';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = useMemo(() => searchParams.get('email') ?? '', [searchParams]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center rounded-2xl bg-brand/10 p-4 text-brand ring-1 ring-brand/20">
        <MailCheck className="h-10 w-10" aria-hidden="true" />
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Verifique seu e-mail</h2>
        <p className="text-sm leading-relaxed text-muted">
          Acabamos de criar sua conta e enviamos uma mensagem para{' '}
          <span className="font-semibold text-ink">{email || 'seu e-mail'}</span>.
        </p>
      </div>

      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 text-sm text-muted">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <p>
            Confirme o endereço para ativar a conta e continuar para o onboarding com segurança.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <Button type="button" className="w-full" onClick={() => router.push('/onboarding')}>
          Continuar para o onboarding
        </Button>
        <Link href="/cadastro" className="text-center text-sm font-medium text-muted hover:text-brand">
          Usar outro e-mail
        </Link>
      </div>

      <p className="text-center text-xs text-muted lg:text-left">
        Não recebeu? Verifique sua caixa de spam ou tente novamente em alguns minutos.
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
