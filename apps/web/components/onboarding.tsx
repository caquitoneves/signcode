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
        'flex h-full w-full flex-col gap-3 rounded-2xl border p-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        active
          ? 'border-brand bg-brand/10 text-ink glow-brand'
          : 'border-edge bg-elevated text-muted hover:border-brand/50 hover:text-ink',
      )}
    >
      <span className="flex items-center justify-between">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            active ? 'bg-brand/20 text-brand' : 'bg-card text-muted',
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
        {active ? <Check className="h-5 w-5 text-brand" aria-hidden="true" /> : null}
      </span>
      <span className="text-lg font-semibold text-ink">{title}</span>
      <span className="text-sm leading-relaxed">{desc}</span>
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
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-brand"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
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
    <main className="aurora flex min-h-[calc(100vh-3.5rem)] flex-col lg:h-[calc(100vh-3.5rem)] lg:overflow-hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-6">
        {/* Indicador de passos */}
        <ol className="flex items-center gap-3" aria-label="Progresso do onboarding">
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

        {/* Conteúdo — centralizado verticalmente no espaço restante */}
        <div key={step} className="flex flex-1 animate-fade-up items-center">
          {step === 0 ? (
            <section className="grid w-full items-center gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-5 text-center lg:text-left">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/40 lg:mx-0">
                  <Hand className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  {first ? (
                    <>
                      Boas-vindas,
                      <br />
                      <span className="text-brand">{first}</span>!
                    </>
                  ) : (
                    <>
                      Boas-vindas ao
                      <br />
                      <span className="text-brand">aprender em Libras</span>!
                    </>
                  )}
                </h1>
                <p className="text-lg leading-relaxed text-muted">
                  Aqui você aprende tecnologia com Libras como língua principal — não como uma
                  janelinha no canto. Assista às boas-vindas em Libras ao lado.
                </p>
                <p className="flex items-center justify-center gap-2 text-sm text-muted lg:justify-start">
                  <LibrasBadge /> vídeo de exemplo — será substituído pelo intérprete oficial
                </p>
              </div>
              <div className="mx-auto w-full max-w-xl">
                <div className="overflow-hidden rounded-2xl border border-edge bg-black shadow-lg glow-brand">
                  <video
                    src={WELCOME_VIDEO}
                    className="aspect-video max-h-[52vh] w-full"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Vídeo de boas-vindas em Libras"
                  />
                </div>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="flex w-full flex-col gap-8">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  Qual sua língua principal?
                </h1>
                <p className="text-lg text-muted">
                  Isso ajusta a experiência ao seu jeito de aprender.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <OptionCard
                  active={prefs.language === 'libras'}
                  onClick={() => setPrefs({ language: 'libras', interpreterDefault: true })}
                  icon={<Hand className="h-6 w-6" />}
                  title="Libras"
                  desc="Intérprete de Libras sempre visível por padrão nas aulas. Ideal para quem tem Libras como primeira língua."
                />
                <OptionCard
                  active={prefs.language === 'pt-BR'}
                  onClick={() => setPrefs({ language: 'pt-BR' })}
                  icon={<Languages className="h-6 w-6" />}
                  title="Português escrito"
                  desc="Foco no conteúdo em português, com o intérprete de Libras disponível sempre que quiser."
                />
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="flex w-full flex-col gap-8">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  Ajuste a acessibilidade
                </h1>
                <p className="text-lg text-muted">
                  Você pode mudar tudo isso depois, quando quiser.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
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
                <Card className="flex flex-col justify-center gap-3 p-4">
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
            <section className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/40">
                <PartyPopper className="h-8 w-8" aria-hidden="true" />
              </span>
              <h1 className="text-4xl font-bold tracking-tight">Tudo pronto!</h1>
              <p className="text-lg text-muted">
                Sua experiência está configurada. Vamos começar por{' '}
                <span className="text-ink">Programação do Zero</span>.
              </p>
              <Card className="w-full p-5 text-left">
                <ul className="flex flex-col gap-2.5 text-sm">
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
          <div className="flex items-center gap-3">
            {step < last ? (
              <button
                type="button"
                onClick={finish}
                className="text-sm text-muted transition-colors hover:text-ink focus-visible:underline focus-visible:outline-none"
              >
                Pular por agora
              </button>
            ) : null}
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
        </div>
      </div>
    </main>
  );
}
