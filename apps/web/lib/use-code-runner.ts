'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface ConsoleLine {
  kind: 'log' | 'error';
  text: string;
}

export interface TestCase {
  /** Descrição visível para o aluno. */
  description: string;
  /**
   * Expressão booleana avaliada APÓS o código do aluno, no mesmo escopo.
   * Ex.: "typeof soma === 'function' && soma(2,3) === 5".
   */
  assert: string;
}

export interface TestResult {
  description: string;
  passed: boolean;
  error: string | null;
}

export interface RunResult {
  logs: ConsoleLine[];
  tests: TestResult[];
  runtimeError: string | null;
  timedOut: boolean;
}

const TIMEOUT_MS = 3000;

// Código do worker (string) — isolado da thread principal, encerrável por timeout.
const WORKER_SRC = `
self.onmessage = function (e) {
  var code = e.data.code;
  var tests = e.data.tests || [];
  var logs = [];
  var console = {
    log: function () {
      logs.push({ kind: 'log', text: Array.prototype.map.call(arguments, fmt).join(' ') });
    },
    error: function () {
      logs.push({ kind: 'error', text: Array.prototype.map.call(arguments, fmt).join(' ') });
    },
    warn: function () {
      logs.push({ kind: 'log', text: Array.prototype.map.call(arguments, fmt).join(' ') });
    },
    info: function () {
      logs.push({ kind: 'log', text: Array.prototype.map.call(arguments, fmt).join(' ') });
    },
  };
  function fmt(v) {
    if (typeof v === 'string') return v;
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  var runtimeError = null;
  var testResults = [];
  try {
    var userFn = new Function('console', code + '\\n;return {};');
    userFn(console);
    for (var i = 0; i < tests.length; i++) {
      var t = tests[i];
      try {
        var checkFn = new Function('console', code + '\\n;return (' + t.assert + ');');
        var ok = checkFn(console);
        testResults.push({ description: t.description, passed: !!ok, error: null });
      } catch (err) {
        testResults.push({ description: t.description, passed: false, error: String(err && err.message ? err.message : err) });
      }
    }
  } catch (err) {
    runtimeError = String(err && err.message ? err.message : err);
  }
  self.postMessage({ logs: logs, tests: testResults, runtimeError: runtimeError });
};
`;

export function useCodeRunner() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const run = useCallback(
    (code: string, tests: TestCase[] = []) => {
      cleanup();
      setRunning(true);
      setResult(null);

      let blobUrl = '';
      try {
        const blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
        blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);
        workerRef.current = worker;

        worker.onmessage = (
          e: MessageEvent<{
            logs: ConsoleLine[];
            tests: TestResult[];
            runtimeError: string | null;
          }>,
        ) => {
          if (timerRef.current) clearTimeout(timerRef.current);
          setResult({
            logs: e.data.logs,
            tests: e.data.tests,
            runtimeError: e.data.runtimeError,
            timedOut: false,
          });
          setRunning(false);
          worker.terminate();
          workerRef.current = null;
          URL.revokeObjectURL(blobUrl);
        };

        worker.onerror = () => {
          if (timerRef.current) clearTimeout(timerRef.current);
          setResult({
            logs: [],
            tests: [],
            runtimeError: 'Erro ao executar o código.',
            timedOut: false,
          });
          setRunning(false);
          worker.terminate();
          workerRef.current = null;
          URL.revokeObjectURL(blobUrl);
        };

        timerRef.current = setTimeout(() => {
          worker.terminate();
          workerRef.current = null;
          URL.revokeObjectURL(blobUrl);
          setResult({
            logs: [],
            tests: [],
            runtimeError: 'Tempo excedido — verifique se há um loop infinito.',
            timedOut: true,
          });
          setRunning(false);
        }, TIMEOUT_MS);

        worker.postMessage({ code, tests });
      } catch {
        if (blobUrl) URL.revokeObjectURL(blobUrl);
        setResult({
          logs: [],
          tests: [],
          runtimeError: 'Seu navegador não conseguiu executar o código.',
          timedOut: false,
        });
        setRunning(false);
      }
    },
    [cleanup],
  );

  return { run, running, result };
}
