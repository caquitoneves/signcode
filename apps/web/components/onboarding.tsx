'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Captions,
  Check,
  Gauge,
  Hand,
  Languages,
  PartyPopper,
  Type,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '@projetox/ui';
import { useAuth } from '@/lib/auth-context';
import { usePrefs, type FontScale } from '@/lib/prefs-context';
import { Button, Card, LibrasBadge } from './ui';

const WELCOME_VIDEO = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const STEPS = ['Boas-vindas', 'Idioma', 'Acessibilidade', 'Pronto'] as const;

function OptionCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        active
          ? 'border-brand bg-brand/10 text-ink'
          : 'border-edge bg-elevated text-muted hover:border-brand/50 hover:text-ink',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
          active ? 'bg-brand/20 text-brand' : 'bg-card text-muted',
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold text-ink">{title}</span>
        <span className="text-sm">{desc}</span>
      </span>
      {active ? <Check className="ml-auto h-5 w-5 text-brand" aria-hidden="true" /> : null}
    </button>
  );
}

function ToggleRow({
  checked,
  onChange,
  icon,
  title,
  desc,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 rounded-2xl border border-edge bg-elevated p-4 text-left transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card text-brand"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold text-ink">{title}</span>
        <span className="text-sm text-muted">{desc}</span>
      </span>
      <span
        className={cn(
          'ml-auto flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors',
          checked ? 'bg-brand' : 'bg-edge',
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            'h-5 w-5 rounded-full bg-white transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </span>
    </button>
  );
}

const FONT_OPTIONS: { value: FontScale; label: string }[] = [
  { value: 'normal', label: 'Padrão' },
  { value: 'large', label: 'Grande' },
  { value: 'xlarge', label: 'Maior' },
];

export function Onboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const { prefs, setPrefs } = usePrefs();
  const [step, setStep] = useState(0);

  const first = user?.name ? user.name.split(' ')[0] : null;
  const last = STEPS.length - 1;

  function finish(): void {
    setPrefs({ onboarded: true });
    router.push('/painel');
  }

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
        {/* Indicador de passos */}
        <ol className="flex items-center gap-2" aria-label="Progresso do onboarding">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 flex-col gap-1.5">
              <span
                className={cn(
                  'h-1.5 rounded-full transition-colors',
                  i <= step ? 'bg-brand' : 'bg-edge',
                )}
              />
              <span
                className={cn(
                  'hidden text-xs sm:block',
                  i === step ? 'font-medium text-ink' : 'text-muted',
                )}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>

        <div key={step} className="animate-fade-up">
          {step === 0 ? (
            <section className="flex flex-col gap-5 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/40">
                  <Hand className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {first ? `Boas-vindas, ${first}!` : 'Boas-vindas!'}
              </h1>
              <p className="mx-auto max-w-md text-muted">
                Aqui você aprende tecnologia com Libras como língua principal — não como uma
                janelinha no canto. Assista às boas-vindas em Libras:
              </p>
              <div className="mx-auto w-full max-w-md">
                <div className="overflow-hidden rounded-2xl border border-edge bg-black shadow-lg glow-brand">
                  <video
                    src={WELCOME_VIDEO}
                    className="aspect-video w-full"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Vídeo de boas-vindas em Libras"
                  />
                </div>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted">
                  <LibrasBadge /> vídeo de exemplo — será substituído pelo intérprete oficial
                </p>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Qual sua língua principal?</h1>
                <p className="text-muted">Isso ajusta a experiência ao seu jeito de aprender.</p>
              </div>
              <div className="flex flex-col gap-3">
                <OptionCard
                  active={prefs.language === 'libras'}
                  onClick={() => setPrefs({ language: 'libras', interpreterDefault: true })}
                  icon={<Hand className="h-5 w-5" />}
                  title="Libras"
                  desc="Intérprete de Libras sempre visível por padrão nas aulas."
                />
                <OptionCard
                  active={prefs.language === 'pt-BR'}
                  onClick={() => setPrefs({ language: 'pt-BR' })}
                  icon={<Languages className="h-5 w-5" />}
                  title="Português escrito"
                  desc="Foco no conteúdo em português, com Libras disponível quando quiser."
                />
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Ajuste a acessibilidade</h1>
                <p className="text-muted">Você pode mudar tudo isso depois, quando quiser.</p>
              </div>
              <div className="flex flex-col gap-3">
                <ToggleRow
                  checked={prefs.interpreterDefault}
                  onChange={(v) => setPrefs({ interpreterDefault: v })}
                  icon={<Hand className="h-5 w-5" />}
                  title="Intérprete de Libras por padrão"
                  desc="Abrir a janela do intérprete automaticamente nas aulas."
                />
                <ToggleRow
                  checked={prefs.captionsDefault}
                  onChange={(v) => setPrefs({ captionsDefault: v })}
                  icon={<Captions className="h-5 w-5" />}
                  title="Legenda por padrão"
                  desc="Mostrar a legenda assim que a aula abrir."
                />
                <ToggleRow
                  checked={prefs.reduceMotion}
                  onChange={(v) => setPrefs({ reduceMotion: v })}
                  icon={<Gauge className="h-5 w-5" />}
                  title="Reduzir animações"
                  desc="Menos movimento na interface."
                />
                <Card className="flex flex-col gap-3 p-4">
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <Type className="h-5 w-5 text-brand" aria-hidden="true" />
                    Tamanho da fonte
                  </span>
                  <div className="flex gap-2" role="group" aria-label="Tamanho da fonte">
                    {FONT_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={prefs.fontScale === o.value}
                        onClick={() => setPrefs({ fontScale: o.value })}
                        className={cn(
                          'flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                          prefs.fontScale === o.value
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-edge bg-elevated text-muted hover:text-ink',
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="flex flex-col items-center gap-5 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/40">
                <PartyPopper className="h-7 w-7" aria-hidden="true" />
              </span>
              <h1 className="text-3xl font-bold tracking-tight">Tudo pronto!</h1>
              <p className="mx-auto max-w-md text-muted">
                Sua experiência está configurada. Vamos começar por{' '}
                <span className="text-ink">Programação do Zero</span>.
              </p>
              <Card className="w-full max-w-md p-4 text-left">
                <ul className="flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                    Língua principal: {prefs.language === 'libras' ? 'Libras' : 'Português escrito'}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                    Intérprete por padrão: {prefs.interpreterDefault ? 'sim' : 'não'}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                    Legenda por padrão: {prefs.captionsDefault ? 'sim' : 'não'}
                  </li>
                </ul>
              </Card>
            </section>
          ) : null}
        </div>

        {/* Navegação */}
        <div className="flex items-center justify-between gap-2">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <span />
          )}
          {step < last ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={finish}>
              Começar a aprender
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {step < last ? (
          <button
            type="button"
            onClick={finish}
            className="mx-auto text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:underline"
          >
            Pular por agora
          </button>
        ) : null}
      </div>
    </main>
  );
}
