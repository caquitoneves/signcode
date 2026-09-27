import Link from 'next/link';
import { Captions, Code2, Hand, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

const FEATURES = [
  {
    icon: <Hand className="h-5 w-5" />,
    title: 'Libras como língua principal',
    desc: 'Intérprete sempre presente — não uma janelinha no canto.',
  },
  {
    icon: <Captions className="h-5 w-5" />,
    title: 'Legenda, transcrição e português',
    desc: 'Cada aula em várias formas, do seu jeito de aprender.',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Prática real com editor de código',
    desc: 'Aprenda programando de verdade, direto no navegador.',
  },
];

function BrandPanel() {
  return (
    <aside className="aurora relative hidden flex-col justify-between overflow-hidden border-r border-edge bg-card p-10 lg:flex">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/40">
          <Hand className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="font-semibold tracking-tight">
          Aprender <span className="text-brand">em Libras</span>
        </span>
      </Link>

      <div className="flex max-w-md flex-col gap-8">
        <h2 className="text-4xl font-bold leading-tight tracking-tight">
          Tecnologia que se aprende <span className="text-brand">em Libras</span>, do início ao fim.
        </h2>
        <ul className="stagger-children flex flex-col gap-5">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand"
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold text-ink">{f.title}</span>
                <span className="text-sm text-muted">{f.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="flex items-center gap-2 text-sm text-muted">
        <Sparkles className="h-4 w-4 text-brand" aria-hidden="true" />
        Turma piloto — vagas limitadas
      </p>
    </aside>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="grid min-h-[calc(100vh-3.5rem)] lg:grid-cols-2">
      <BrandPanel />

      <section className="flex flex-col justify-center px-6 py-12">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/40 lg:hidden">
              <Hand className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle ? <p className="text-muted">{subtitle}</p> : null}
            </div>
          </div>
          {children}
          {footer ? (
            <div className="text-center text-sm text-muted lg:text-left">{footer}</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
