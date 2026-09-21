import { cn } from '@projetox/ui';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <span
        className={cn(
          'inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium',
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200',
        )}
      >
        Incremento 1 — fundação no ar ✓
      </span>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Aprender tecnologia em Libras.
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          Uma plataforma de educação em tecnologia construída para pessoas surdas, com Libras como
          língua de ensino de primeira classe — não como legenda ou janela de intérprete.
        </p>
      </div>

      <ul className="flex flex-col gap-2 text-neutral-700 dark:text-neutral-300">
        <li>✓ Libras, português escrito, legenda, transcrição e apoio visual em cada aula.</li>
        <li>✓ Nenhuma informação essencial depende de áudio.</li>
        <li>✓ Prática e progresso desde o começo.</li>
      </ul>

      <div>
        <a
          href="/docs"
          className={cn(
            'inline-flex items-center rounded-lg px-5 py-3 font-medium',
            'bg-indigo-600 text-white transition-colors hover:bg-indigo-700',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          )}
        >
          Documentação da API
        </a>
      </div>
    </main>
  );
}
