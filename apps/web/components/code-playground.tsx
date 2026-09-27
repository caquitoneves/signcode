'use client';

import { AlertCircle, CheckCircle2, Play, RotateCcw, Terminal, XCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@projetox/ui';
import { useCodeRunner, type TestCase } from '@/lib/use-code-runner';
import { CodeEditor } from './code-editor';
import { Button, Card } from './ui';

export function CodePlayground({
  starterCode = '',
  tests = [],
  storageKey,
  height,
}: {
  starterCode?: string;
  tests?: TestCase[];
  storageKey?: string;
  height?: string;
}) {
  const [code, setCode] = useState(() => {
    if (storageKey) {
      try {
        const saved = window.localStorage.getItem(`projetox:code:${storageKey}`);
        if (saved !== null) return saved;
      } catch {
        // ignora
      }
    }
    return starterCode;
  });
  const { run, running, result } = useCodeRunner();

  function update(next: string): void {
    setCode(next);
    if (storageKey) {
      try {
        window.localStorage.setItem(`projetox:code:${storageKey}`, next);
      } catch {
        // ignora
      }
    }
  }

  function reset(): void {
    update(starterCode);
  }

  // Uma execução com erro (sintaxe/runtime/timeout) NÃO conta como testes avaliados.
  const hasError = Boolean(result && (result.runtimeError || result.timedOut));
  const evaluated = Boolean(result) && !hasError;
  const allPassed =
    evaluated &&
    tests.length > 0 &&
    result!.tests.length === tests.length &&
    result!.tests.every((t) => t.passed);

  // Linhas exibidas no painel de testes: os resultados reais quando avaliado;
  // caso contrário, os testes em estado neutro (pendente).
  const testRows =
    evaluated && result!.tests.length === tests.length
      ? result!.tests
      : tests.map((t) => ({ description: t.description, passed: false, error: null }));

  return (
    <div className="flex flex-col gap-3">
      <CodeEditor value={code} onChange={update} height={height} />

      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => run(code, tests)} disabled={running}>
          <Play className="h-4 w-4" aria-hidden="true" />
          {running ? 'Executando…' : 'Executar'}
        </Button>
        <Button variant="secondary" onClick={reset} disabled={running}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Recomeçar
        </Button>
        {hasError ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-300">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            Erro ao executar o código
          </span>
        ) : allPassed ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Todos os testes passaram!
          </span>
        ) : null}
      </div>

      {/* Saída do console */}
      <Card className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-edge bg-elevated px-4 py-2 text-sm text-muted">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          Saída
        </div>
        <div
          className="max-h-56 overflow-auto p-4 font-mono text-sm"
          role="status"
          aria-live="polite"
        >
          {!result ? (
            <span className="text-muted">Clique em Executar para ver o resultado.</span>
          ) : (
            <>
              {result.logs.length === 0 && !result.runtimeError ? (
                <span className="text-muted">Sem saída no console.</span>
              ) : null}
              {result.logs.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'whitespace-pre-wrap',
                    line.kind === 'error' ? 'text-red-300' : 'text-ink',
                  )}
                >
                  {line.text}
                </div>
              ))}
              {result.runtimeError ? (
                <div className="whitespace-pre-wrap text-red-300">⚠ {result.runtimeError}</div>
              ) : null}
            </>
          )}
        </div>
      </Card>

      {/* Testes */}
      {tests.length > 0 ? (
        <Card className="flex flex-col divide-y divide-edge overflow-hidden">
          <div className="bg-elevated px-4 py-2 text-sm text-muted">Testes</div>
          {testRows.map((t, i) => (
            <div key={i} className="flex items-start gap-2 px-4 py-2.5 text-sm">
              {!evaluated ? (
                <span
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-edge"
                  aria-hidden="true"
                />
              ) : t.passed ? (
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
              )}
              <span className="flex flex-col">
                <span className={cn(evaluated && t.passed ? 'text-ink' : 'text-muted')}>
                  {t.description}
                </span>
                {evaluated && t.error ? (
                  <span className="text-xs text-red-300">{t.error}</span>
                ) : null}
              </span>
            </div>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
