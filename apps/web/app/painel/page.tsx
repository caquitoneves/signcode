'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import type { CourseTree, CourseTreeLesson, CourseTreeModule } from '@signcode/contracts';
import { EmptyArt } from '@/components/illustrations';
import { StateMessage } from '@/components/state-message';
import { DashboardSkeleton, ErrorState } from '@/components/skeleton';
import { Button, Card, LibrasBadge, ProgressBar } from '@/components/ui';
import { useAuth } from '@/lib/auth-context';
import { useProfile } from '@/lib/profile-context';
import { useCourse, useCourseProgress, useCourses, useDashboard } from '@/lib/queries';

interface NextUp {
  courseSlug: string;
  courseTitle: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  completed: number;
  total: number;
  finished: boolean;
}

function percent(completed: number, total: number): number {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

function lessonTitle(l: CourseTreeLesson): string {
  const t = l.translations.find((x) => x.languageCode === 'pt-BR') ?? l.translations[0];
  return t?.title ?? l.slug;
}

function findNext(
  tree: CourseTree,
  done: Set<string>,
): { lesson: CourseTreeLesson; module: CourseTreeModule } | null {
  for (const m of [...tree.modules].sort((a, b) => a.order - b.order)) {
    for (const l of [...m.lessons].sort((a, b) => a.order - b.order)) {
      if (!done.has(l.id)) return { lesson: l, module: m };
    }
  }
  return null;
}

function StatTile({
  icon,
  label,
  value,
  tint = 'bg-brand/15 text-brand',
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tint?: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-2xl font-bold tabular-nums text-ink">{value}</span>
        <span className="text-sm text-muted">{label}</span>
      </span>
    </Card>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  href,
  accent,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  accent: string;
}) {
  return (
    <Card className="flex h-full flex-col gap-3 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      <Link href={href} className="mt-auto text-sm font-medium text-brand hover:underline">
        Acessar
      </Link>
    </Card>
  );
}

export default function PainelPage() {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const { data: items, isPending: itemsPending, isError, refetch } = useDashboard(Boolean(user));
  const { data: catalogData } = useCourses();
  const catalog = catalogData ?? [];

  const primary = useMemo(() => {
    const list = items ?? [];
    return (
      [...list]
        .filter((d) => d.completed < d.total)
        .sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt))[0] ??
      list[0] ??
      null
    );
  }, [items]);

  const { data: primaryTree } = useCourse(primary?.course.slug ?? '');
  const { data: primaryProgress } = useCourseProgress(
    primary?.course.slug ?? '',
    Boolean(user && primary),
  );

  const nextUp = useMemo<NextUp | null>(() => {
    if (!primary || !primaryTree || !primaryProgress) return null;
    const done = new Set(primaryProgress.completedLessonIds);
    const found = findNext(primaryTree, done);
    return {
      courseSlug: primary.course.slug,
      courseTitle: primary.course.title,
      moduleTitle: found?.module.title ?? '',
      lessonId: found?.lesson.id ?? '',
      lessonTitle: found ? lessonTitle(found.lesson) : '',
      completed: primaryProgress.completed,
      total: primaryProgress.total,
      finished: !found,
    };
  }, [primary, primaryTree, primaryProgress]);

  const first = user?.name ? user.name.split(' ')[0] : null;
  const enrolledSlugs = new Set((items ?? []).map((i) => i.course.slug));
  const recommended = catalog.filter((c) => !enrolledSlugs.has(c.slug));

  const totalCompleted = (items ?? []).reduce((s, i) => s + i.completed, 0);
  const totalLessons = (items ?? []).reduce((s, i) => s + i.total, 0);
  const inProgress = (items ?? []).filter((i) => i.completed < i.total).length;

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        {authLoading || (user && itemsPending) ? <DashboardSkeleton /> : null}

        {!authLoading && !user ? (
          <StateMessage>
            Entre para ver seu painel.{' '}
            <Link href="/entrar" className="font-medium text-brand hover:underline">
              Entrar
            </Link>
          </StateMessage>
        ) : null}

        {isError ? (
          <ErrorState
            message="Não foi possível carregar o painel."
            onRetry={() => void refetch()}
          />
        ) : null}

        {user ? (
          <>
            <header className="overflow-hidden rounded-[30px] border border-brand/10 bg-[radial-gradient(circle_at_top_left,_rgba(202,184,255,0.22),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.13),_transparent_18%),linear-gradient(135deg,#ffffff_0%,#f7f7ff_42%,#f5faf9_100%)] p-6 shadow-[0_22px_80px_rgba(99,102,241,0.08)] sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Teu espaço de aprendizado
                  </span>
                  <h1 className="text-3xl font-bold tracking-tight text-ink lg:text-5xl">
                    {first ? `Olá, ${first}!` : 'Olá!'}
                  </h1>
                  <p className="mt-3 max-w-lg text-base text-muted lg:text-lg">
                    {profile.learningGoal || 'Continue evoluindo com aulas, desafios e progresso que fazem sentido.'}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link href={nextUp && !nextUp.finished ? `/aulas/${nextUp.lessonId}` : '/cursos'}>
                      <Button size="md">
                        {nextUp && !nextUp.finished ? 'Retomar aula' : 'Explorar cursos'}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Link href="/onboarding">
                      <Button size="md" variant="secondary">
                        Ajustar experiência
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
                  <Card className="p-4 shadow-none ring-1 ring-black/5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                      <Layers className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-bold text-ink">{String(inProgress)}</p>
                    <p className="text-sm text-muted">Cursos ativos</p>
                  </Card>
                  <Card className="p-4 shadow-none ring-1 ring-black/5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-bold text-ink">{String(totalCompleted)}</p>
                    <p className="text-sm text-muted">Aulas concluídas</p>
                  </Card>
                  <Card className="p-4 shadow-none ring-1 ring-black/5 sm:col-span-2">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm text-muted">Progresso geral</span>
                      <span className="text-sm font-semibold text-brand">
                        {percent(totalCompleted, totalLessons)}%
                      </span>
                    </div>
                    <ProgressBar value={totalCompleted} max={totalLessons || 1} />
                  </Card>
                </div>
              </div>
            </header>

            {user && nextUp && !nextUp.finished ? (
              <Card className="glass animate-fade-in overflow-hidden p-0 glow-brand">
                <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-brand">
                      <Play className="h-4 w-4" aria-hidden="true" />
                      Continue de onde você parou
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-2xl font-bold tracking-tight">{nextUp.lessonTitle}</h2>
                      <p className="text-muted">
                        {nextUp.courseTitle} · {nextUp.moduleTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <LibrasBadge />
                      <span className="text-sm text-muted">
                        {nextUp.completed} de {nextUp.total} aulas concluídas
                      </span>
                    </div>
                    <div className="max-w-md">
                      <ProgressBar value={nextUp.completed} max={nextUp.total} />
                    </div>
                  </div>
                  <Link href={`/aulas/${nextUp.lessonId}`} className="shrink-0">
                    <Button size="md" className="w-full lg:w-auto">
                      Retomar aula
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : null}

            {user && nextUp && nextUp.finished ? (
              <Card className="glass flex flex-col gap-3 p-6 sm:p-8">
                <span className="flex items-center gap-2 text-sm font-medium text-brand">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Parabéns!
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Você concluiu {nextUp.courseTitle}
                </h2>
                <p className="text-muted">Que tal explorar um novo curso e seguir evoluindo?</p>
              </Card>
            ) : null}

            {user && items && items.length > 0 ? (
              <section className="grid gap-4 sm:grid-cols-3">
                <StatTile
                  icon={<Layers className="h-5 w-5" />}
                  label="Cursos em andamento"
                  value={String(inProgress)}
                  tint="bg-brand/15 text-brand"
                />
                <StatTile
                  icon={<CheckCircle2 className="h-5 w-5" />}
                  label="Aulas concluídas"
                  value={String(totalCompleted)}
                  tint="bg-emerald-500/15 text-emerald-600"
                />
                <StatTile
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Progresso geral"
                  value={`${percent(totalCompleted, totalLessons)}%`}
                  tint="bg-violet-500/15 text-violet-600"
                />
              </section>
            ) : null}

            {user && items && items.length === 0 ? (
              <>
                <Card className="flex flex-col items-center gap-4 p-10 text-center">
                  <EmptyArt />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Você ainda não está matriculado em nenhum curso.</p>
                    <p className="text-sm text-muted">Escolha um curso e comece a aprender.</p>
                  </div>
                  <Link href="/">
                    <Button>Ver cursos</Button>
                  </Link>
                </Card>

                <section className="grid gap-4 md:grid-cols-3">
                  <QuickActionCard
                    icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
                    title="Primeiros passos"
                    description="Revise idioma, legendas e acessibilidade para personalizar sua experiência."
                    href="/onboarding"
                    accent="bg-brand/15 text-brand ring-1 ring-brand/30"
                  />
                  <QuickActionCard
                    icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
                    title="Curso recomendado"
                    description="Comece pelo caminho de programação do zero, pensado para quem está começando."
                    href="/cursos/programacao-do-zero"
                    accent="bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/20"
                  />
                  <QuickActionCard
                    icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
                    title="Conta protegida"
                    description="Sua sessão e recuperação de senha seguem um padrão seguro e consistente."
                    href="/painel"
                    accent="bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/20"
                  />
                </section>
              </>
            ) : null}

            {user && items && items.length > 0 ? (
              <section className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap className="h-5 w-5 text-brand" aria-hidden="true" />
                  Meus cursos
                </h2>
                <ul className="stagger-children grid gap-4 md:grid-cols-2">
                  {items.map((item) => {
                    const pct = percent(item.completed, item.total);
                    return (
                      <li key={item.course.id}>
                        <Card className="lift flex h-full flex-col gap-4 p-5 transition-colors hover:border-brand/40">
                          <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                              <GraduationCap className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <div className="flex flex-1 flex-col gap-1">
                              <h3 className="font-semibold">{item.course.title}</h3>
                              {item.course.description ? (
                                <p className="line-clamp-2 text-sm text-muted">
                                  {item.course.description}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="mt-auto flex flex-col gap-2">
                            <div className="flex justify-between text-sm text-muted">
                              <span>
                                {item.completed} de {item.total} aulas
                              </span>
                              <span className="font-medium text-brand">{pct}%</span>
                            </div>
                            <ProgressBar value={item.completed} max={item.total} />
                            <Link href={`/cursos/${item.course.slug}`} className="mt-1">
                              <Button size="sm" variant="secondary" className="w-full">
                                {pct > 0 ? 'Continuar' : 'Começar'}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            {user && items && recommended.length > 0 ? (
              <section className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Compass className="h-5 w-5 text-brand" aria-hidden="true" />
                  Explorar novos cursos
                </h2>
                <ul className="stagger-children grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommended.map((c) => (
                    <li key={c.id}>
                      <Link href={`/cursos/${c.slug}`} className="group block h-full">
                        <Card className="lift flex h-full flex-col gap-3 p-5 transition-colors group-hover:border-brand/50">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-elevated text-brand">
                            <BookOpen className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <h3 className="font-semibold">{c.title}</h3>
                          {c.description ? (
                            <p className="line-clamp-3 text-sm text-muted">{c.description}</p>
                          ) : null}
                          <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-brand">
                            Ver curso
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Card>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
}
