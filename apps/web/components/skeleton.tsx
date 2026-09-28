import { RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@signcode/ui';
import { Button, Card } from './ui';

/** Bloco base de carregamento: pulsa suavemente no tom do tema. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-md bg-elevated', className)} aria-hidden="true" />
  );
}

/** Algumas linhas de texto fantasma; a última sai mais curta. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  );
}

/** Envolve um skeleton anunciando "carregando" para leitores de tela. */
function Loading({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-label={label} className="animate-fade-in">
      {children}
    </div>
  );
}

/** Erro padronizado com botão de nova tentativa. */
export function ErrorState({
  message = 'Não foi possível carregar.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex animate-fade-in flex-col items-center gap-3 rounded-2xl border border-edge bg-card px-4 py-10 text-center"
    >
      <p className="text-muted">{message}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Tentar de novo
        </Button>
      ) : null}
    </div>
  );
}

/** Grade de cards (catálogo de cursos, recomendados). */
export function CourseCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Loading label="Carregando cursos">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            <Card className="flex h-full flex-col gap-3 p-5">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <SkeletonText lines={2} />
            </Card>
          </li>
        ))}
      </ul>
    </Loading>
  );
}

/** Cabeçalho comum das telas de detalhe (checkpoint, projeto, desafio, diagnóstico). */
export function DetailSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <Loading label="Carregando">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-7 w-64 max-w-full" />
        </div>
        <SkeletonText lines={2} className="max-w-xl" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: cards }).map((_, i) => (
            <Card key={i} className="flex flex-col gap-3 p-5">
              <Skeleton className="h-4 w-1/2" />
              <SkeletonText lines={2} />
            </Card>
          ))}
        </div>
      </div>
    </Loading>
  );
}

/** Tela de aula: área de vídeo + título + conteúdo. */
export function LessonSkeleton() {
  return (
    <Loading label="Carregando aula">
      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-8 w-40 rounded-lg" />
        </div>
        <SkeletonText lines={4} />
      </div>
    </Loading>
  );
}

/** Tela do curso: hero + lista de módulos. */
export function CourseSkeleton() {
  return (
    <Loading label="Carregando curso">
      <div className="flex flex-col gap-8">
        <Card className="flex flex-col gap-4 p-6 sm:p-8">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-9 w-2/3" />
          <SkeletonText lines={2} className="max-w-2xl" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
        </Card>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-6 w-56 max-w-full" />
            <Card className="flex flex-col divide-y divide-edge overflow-hidden">
              {Array.from({ length: 4 }).map((__, j) => (
                <div key={j} className="flex items-center gap-3 px-4 py-3.5">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </Loading>
  );
}

/** Painel: destaque + tiles + cards de cursos. */
export function DashboardSkeleton() {
  return (
    <Loading label="Carregando painel">
      <div className="flex flex-col gap-8">
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-2.5 w-full max-w-md rounded-full" />
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex items-center gap-4 p-5">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-3 w-24" />
              </div>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="flex flex-col gap-4 p-5">
              <div className="flex gap-3">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
              <Skeleton className="h-2.5 w-full rounded-full" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      </div>
    </Loading>
  );
}
