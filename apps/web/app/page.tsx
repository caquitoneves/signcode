'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  Captions,
  Check,
  ClipboardCheck,
  Code2,
  Compass,
  Eye,
  FileText,
  FolderGit2,
  GraduationCap,
  Hand,
  HeartHandshake,
  MonitorPlay,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { useCourses } from '@/lib/queries';
/* ---------------- Peças visuais ---------------- */
function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M13 70 37 76" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" />
      <path d="M31 34 47 50" stroke="#fbbf24" strokeWidth="10" strokeLinecap="round" />
      <path d="M69 12 75 36" stroke="#10b981" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
const TRILHAS = [
  'Programação do Zero',
  'Fundamentos Web',
  'Frontend',
  'Backend',
  'Banco de Dados',
  'Full Stack',
  'Cloud & DevOps',
  'Inteligência Artificial',
  'Carreira',
];
const STATS = [
  { value: '13', label: 'Módulos', cls: 'bg-rose-500 text-white' },
  { value: '114', label: 'Aulas', cls: 'bg-sky-600 text-white' },
  { value: 'Libras', label: 'Língua principal', cls: 'bg-emerald-600 text-white' },
  { value: 'Piloto', label: 'Vagas abertas', cls: 'bg-amber-400 text-slate-900' },
];
const FLOW = [
  { icon: Compass, title: 'Diagnóstico', desc: 'A gente entende seu ponto de partida.' },
  { icon: MonitorPlay, title: 'Aula', desc: 'Vídeo em Libras, legenda, texto e código.' },
  { icon: Code2, title: 'Prática', desc: 'Você escreve código no próprio navegador.' },
  { icon: Rocket, title: 'Desafio', desc: 'Resolve um problema com as próprias mãos.' },
  { icon: FolderGit2, title: 'Projeto', desc: 'Constrói algo que vai pro seu portfólio.' },
  { icon: ClipboardCheck, title: 'Checkpoint', desc: 'Confirma que aprendeu de verdade.' },
];
const METODO = [
  {
    icon: Hand,
    title: 'Libras em primeiro lugar',
    desc: 'A aula nasce em Libras — não é legenda nem janelinha de canto.',
    cls: 'text-brand-strong bg-brand/10',
  },
  {
    icon: MonitorPlay,
    title: 'Termos com vídeo',
    desc: 'Não entendeu um termo? Abra o vídeo do sinal com toque, clique ou teclado.',
    cls: 'text-coral bg-coral/10',
  },
  {
    icon: Code2,
    title: 'Editor no navegador',
    desc: 'Escreva e rode JavaScript na hora, sem instalar nada.',
    cls: 'text-sky bg-sky/10',
  },
  {
    icon: Eye,
    title: 'Feedback visual',
    desc: 'Tudo é visual: nada essencial depende de áudio.',
    cls: 'text-violet bg-violet/10',
  },
  {
    icon: Captions,
    title: 'Legenda e transcrição',
    desc: 'Apoio escrito em português em cada aula.',
    cls: 'text-emerald-600 bg-emerald-500/10',
  },
  {
    icon: FileText,
    title: 'Prática desde o início',
    desc: 'Exercícios, desafios e projetos a cada passo.',
    cls: 'text-amber-600 bg-amber/10',
  },
];
const FAQ = [
  {
    q: 'Preciso saber programar para começar?',
    a: 'Não. O curso começa do zero absoluto — do que é um computador até seu primeiro projeto.',
  },
  {
    q: 'Preciso saber inglês?',
    a: 'Não. Todo o conteúdo é em português e Libras. Termos em inglês são explicados quando aparecem.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim. A plataforma foi feita para funcionar bem no computador e no celular.',
  },
  {
    q: 'Quanto custa?',
    a: 'A turma piloto é gratuita. Em troca, pedimos seu feedback para melhorarmos o método.',
  },
];
/* ---------------- Página ---------------- */
export default function HomePage() {
  const { data: courses } = useCourses();
  return (
    <div className="bg-white text-slate-900">
      {/* Hero principal */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-4 px-6 pb-6 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:pb-8 lg:pt-8">
          <div className="relative z-10 flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-brand-strong shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Turma piloto — vagas limitadas
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#0b1a58] sm:text-5xl xl:text-[3.4rem]">
              Seu futuro também
              <br />
              <span>fala em Libras.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Aprenda programação em Libras, com aulas visuais, prática real e projetos para o seu
              portfólio.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-brand-fg shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Começar agora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/cursos/programacao-do-zero"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Ver o curso
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[620px] items-end justify-center">
            {/* Fundo que ecoa a marca: base suave + colchetes + leque colorido */}
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
              <div className="absolute inset-x-8 bottom-2 top-12 rounded-[3rem] bg-gradient-to-br from-brand/15 via-violet/10 to-emerald-500/15" />
              <div className="absolute bottom-8 left-[1%] top-20 w-10 border-y-[7px] border-l-[7px] border-brand-strong/70 sm:w-14" />
              <div className="absolute bottom-8 right-[1%] top-20 w-10 border-y-[7px] border-r-[7px] border-brand-strong/70 sm:w-14" />
              <svg
                className="absolute left-1/2 top-0 h-28 w-44 -translate-x-1/2 sm:h-36"
                viewBox="0 0 120 70"
                fill="none"
              >
                <g strokeWidth="7" strokeLinecap="round">
                  <path d="M40 60 L32 18" stroke="#ef4444" />
                  <path d="M54 58 L51 8" stroke="#fbbf24" />
                  <path d="M68 58 L71 10" stroke="#10b981" />
                  <path d="M82 60 L90 22" stroke="#a78bfa" />
                </g>
              </svg>
            </div>
            <Image
              src="/images/signcode-hero-mulher.png"
              alt="Mulher sorrindo com as mãos sinalizando em frente ao corpo"
              width={1536}
              height={1024}
              priority
              className="relative z-10 h-auto max-h-[470px] w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>
      {/* MARQUEE DE TRILHAS */}
      <section className="border-y border-slate-200 bg-slate-50 py-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
          Uma jornada, do zero à carreira
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track gap-3 motion-reduce:animate-none">
            {[...TRILHAS, ...TRILHAS].map((t, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <Hand className="h-4 w-4 text-brand" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* STATS COLORIDOS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-sky-600">
          Feito com pessoas surdas, para pessoas surdas
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className={`rounded-3xl p-6 ${s.cls}`}>
              <p className="text-4xl font-extrabold">{s.value}</p>
              <p className="mt-1 font-medium opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* O QUE FAZEMOS — diferencial */}
      <section id="como-funciona" className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-600">
              O que fazemos
            </p>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Querer aprender é fácil.
              <br />
              Ter onde aprender, não.
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              A maior parte dos cursos de tecnologia é feita para ouvintes, e a Libras entra como
              uma janelinha no canto. Aqui é o contrário: a explicação é{' '}
              <strong>construída em Libras</strong>, com apoio visual, legenda e código.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                'Vídeo em Libras com pessoa sinalizante — não avatar.',
                'Termos técnicos com vídeo ao tocar, clicar ou usar o teclado.',
                'Prática de código no navegador, com feedback visual.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-slate-700">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-strong">
                <Hand className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="font-semibold">Libras como língua de ensino de primeira classe</p>
            </div>
            <div className="rounded-3xl bg-rose-500 p-5 text-white shadow-sm">
              <Captions className="h-7 w-7" aria-hidden="true" />
              <p className="mt-2 font-semibold">Legenda + transcrição</p>
            </div>
            <div className="rounded-3xl bg-sky-600 p-5 text-white shadow-sm">
              <Code2 className="h-7 w-7" aria-hidden="true" />
              <p className="mt-2 font-semibold">Código na prática</p>
            </div>
          </div>
        </div>
      </section>
      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
          Como funciona
        </p>
        <h2 className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight">
          Não é um monte de vídeo solto. É uma experiência.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLOW.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand-strong">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-2xl font-extrabold text-slate-200">{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-slate-600">
          …e no fim, seu <strong className="text-slate-900">portfólio</strong> no GitHub, pronto
          para mostrar.
        </p>
      </section>
      {/* MÉTODO POR AULA */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Em cada aula
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">O que torna diferente</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METODO.map((m) => (
              <div
                key={m.title}
                className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${m.cls}`}>
                  <m.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold">{m.title}</h3>
                <p className="text-slate-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PARA EMPRESAS */}
      <section id="para-empresas" className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white sm:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                Para empresas
              </p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Forme e contrate talentos surdos em tecnologia
              </h2>
              <p className="text-lg leading-relaxed text-slate-300">
                Empresas podem patrocinar bolsas, acompanhar o progresso da turma e, no futuro,
                conhecer talentos formados aqui. Inclusão que vira time.
              </p>
              <Link
                href="/cadastro"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-brand-fg motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
              >
                Quero apoiar o piloto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: HeartHandshake, t: 'Bolsas patrocinadas' },
                { icon: Building2, t: 'Programas de inclusão' },
                { icon: GraduationCap, t: 'Formação de talentos' },
                { icon: Sparkles, t: 'Impacto social real' },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                  <x.icon className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                  <span className="font-medium">{x.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CURSOS */}
      <section id="cursos" className="mx-auto max-w-6xl px-6 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-strong">Cursos</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">Comece por aqui</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(courses ?? []).map((c) => (
            <Link
              key={c.id}
              href={`/cursos/${c.slug}`}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-strong">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand-strong">
                  <Hand className="h-3.5 w-3.5" aria-hidden="true" />
                  Libras
                </span>
              </div>
              <h3 className="text-lg font-bold">{c.title}</h3>
              {c.description ? <p className="text-sm text-slate-600">{c.description}</p> : null}
              <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-brand-strong">
                Ver curso
                <ArrowRight
                  className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-4xl font-extrabold tracking-tight">Perguntas frequentes</h2>
        <div className="mt-8 flex flex-col gap-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                {f.q}
                <span className="text-brand transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-emerald-500 p-12 text-center text-brand-fg">
          <Burst className="absolute left-6 top-6 h-14 w-14 opacity-40" />
          <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight">
            Sua carreira em tecnologia começa aqui
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-brand-fg/80">
            Entre na turma piloto e ajude a construir uma escola de tecnologia pensada em Libras.
          </p>
          <Link
            href="/cadastro"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Criar minha conta
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center">
          <p className="max-w-md text-sm text-slate-500">
            Ampliando o acesso de pessoas surdas à educação e às oportunidades em tecnologia.
          </p>
        </div>
      </footer>
    </div>
  );
}
