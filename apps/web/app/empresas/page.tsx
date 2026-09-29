import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Accessibility,
  ArrowRight,
  BriefcaseBusiness,
  Captions,
  CheckCircle2,
  GraduationCap,
  Hand,
  HeartHandshake,
  Mail,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui';

// TODO: trocar pelo canal de contato real da empresa (e-mail ou WhatsApp).
const CONTACT_EMAIL = 'contato@signcode.com.br';
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Parceria SignCode para empresas')}`;

export const metadata: Metadata = {
  title: 'SignCode para empresas — formação e talentos surdos em tecnologia',
  description:
    'Forme equipes, apoie a inclusão e contrate talentos surdos em tecnologia — com Libras como língua principal.',
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export default function EmpresasPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="flex flex-col gap-6">
            <Pill>Para empresas</Pill>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Forme e contrate <span className="text-brand">talentos surdos</span> em tecnologia
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              A SignCode ensina programação com Libras como língua principal — não como uma
              janelinha de intérprete. Sua empresa pode capacitar equipes, apoiar a inclusão e
              acessar profissionais formados nessa base.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={CONTACT_HREF}>
                <Button size="md">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Falar com a equipe
                </Button>
              </a>
              <Link href="/cursos">
                <Button size="md" variant="secondary">
                  Ver os cursos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              Estamos em fase de turma piloto — parcerias sob medida, começando pequeno.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-brand/10 via-violet/10 to-emerald-500/10 p-6 shadow-[0_22px_80px_rgba(99,102,241,0.10)]">
              <ul className="flex flex-col gap-4">
                {[
                  {
                    icon: <GraduationCap className="h-5 w-5" />,
                    t: 'Formação',
                    d: 'Capacite equipes em tecnologia com acessibilidade real.',
                  },
                  {
                    icon: <HeartHandshake className="h-5 w-5" />,
                    t: 'Inclusão',
                    d: 'Patrocine bolsas para estudantes surdos.',
                  },
                  {
                    icon: <BriefcaseBusiness className="h-5 w-5" />,
                    t: 'Contratação',
                    d: 'Acesse talentos formados na plataforma.',
                  },
                ].map((f) => (
                  <li
                    key={f.t}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                      {f.icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{f.t}</span>
                      <span className="text-sm text-slate-600">{f.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Por que */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Talento existe. Falta acesso.</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Pessoas surdas seguem sub-representadas na tecnologia — muitas vezes por falta de
            formação pensada na língua delas, não por falta de capacidade. Quando o ensino nasce em
            Libras, o aprendizado deixa de ser adaptação e vira caminho natural para a carreira.
          </p>
        </div>
      </section>

      {/* Como participar */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-2 text-center">
          <Pill>Como sua empresa participa</Pill>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
            Três formas de gerar impacto
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <GraduationCap className="h-6 w-6" />,
              title: 'Formação de equipes',
              points: [
                'Trilhas de tecnologia acessíveis',
                'Turmas para seu time',
                'Acompanhamento de progresso',
              ],
              tint: 'bg-brand/15 text-brand',
            },
            {
              icon: <HeartHandshake className="h-6 w-6" />,
              title: 'Inclusão e bolsas',
              points: [
                'Patrocine bolsas para estudantes surdos',
                'Marca ligada a impacto real',
                'Relatórios de acompanhamento',
              ],
              tint: 'bg-emerald-500/15 text-emerald-600',
            },
            {
              icon: <BriefcaseBusiness className="h-6 w-6" />,
              title: 'Contratar talentos',
              points: [
                'Acesso a pessoas formadas',
                'Perfis com projetos reais',
                'Pipeline de contratação inclusiva',
              ],
              tint: 'bg-violet/15 text-violet-600',
            },
          ].map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.tint}`}>
                {c.icon}
              </span>
              <h3 className="text-lg font-bold">{c.title}</h3>
              <ul className="flex flex-col gap-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Acessibilidade */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-2 text-center">
            <Pill>Acessibilidade de verdade</Pill>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
              Feito em Libras, não traduzido depois
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Hand className="h-5 w-5" />,
                t: 'Libras como língua',
                d: 'A explicação nasce em Libras, com vídeo de pessoa real.',
              },
              {
                icon: <Captions className="h-5 w-5" />,
                t: 'Legenda e transcrição',
                d: 'Todo conteúdo com apoio em português escrito.',
              },
              {
                icon: <Accessibility className="h-5 w-5" />,
                t: 'Visual primeiro',
                d: 'Sem dependência de áudio; feedback sempre visual.',
              },
              {
                icon: <Users className="h-5 w-5" />,
                t: 'Prática real',
                d: 'Editor de código e projetos, não só vídeo assistido.',
              },
            ].map((f) => (
              <div
                key={f.t}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  {f.icon}
                </span>
                <h3 className="font-semibold">{f.t}</h3>
                <p className="text-sm text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelos de parceria */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-2 text-center">
          <Pill>Modelos de parceria</Pill>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">Montamos junto com você</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Ainda estamos validando formatos no piloto — por isso trabalhamos sob consulta, no
            tamanho que faz sentido para a sua empresa.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'Formação', d: 'Capacitação de equipes em trilhas de tecnologia acessíveis.' },
            {
              t: 'Bolsas / Inclusão',
              d: 'Patrocínio de vagas para estudantes surdos, com acompanhamento.',
            },
            { t: 'Contratação', d: 'Conexão com talentos formados na plataforma.' },
          ].map((p) => (
            <div
              key={p.t}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-lg font-bold">{p.t}</h3>
              <p className="flex-1 text-sm text-slate-600">{p.d}</p>
              <span className="text-2xl font-extrabold tracking-tight">Sob consulta</span>
              <a href={CONTACT_HREF}>
                <Button variant="secondary" className="w-full">
                  Fale conosco
                </Button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-strong to-brand p-10 text-center text-white sm:p-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Vamos ampliar o acesso à tecnologia — juntos?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Conte o que sua empresa busca (formação, inclusão ou contratação) e desenhamos a
            parceria com você.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT_HREF}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-brand-strong shadow-sm transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Falar com a equipe
            </a>
          </div>
          <p className="mt-4 text-sm text-white/70">{CONTACT_EMAIL}</p>
        </div>
      </section>
    </main>
  );
}
