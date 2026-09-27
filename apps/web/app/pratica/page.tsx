'use client';

import { Code2, Hand, Lightbulb } from 'lucide-react';
import { CodePlayground } from '@/components/code-playground';
import { Card, LibrasBadge } from '@/components/ui';
import type { TestCase } from '@/lib/use-code-runner';

const STARTER = `// Crie uma função chamada "soma" que recebe dois números
// e retorna a soma dos dois.
//
// Depois, teste chamando: console.log(soma(2, 3))

function soma(a, b) {
  // escreva sua solução aqui
}
`;

const TESTS: TestCase[] = [
  { description: 'soma é uma função', assert: "typeof soma === 'function'" },
  { description: 'soma(2, 3) retorna 5', assert: 'soma(2, 3) === 5' },
  { description: 'soma(10, -4) retorna 6', assert: 'soma(10, -4) === 6' },
];

export default function PraticaPage() {
  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
        <header className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm text-muted">
            <Code2 className="h-4 w-4 text-brand" aria-hidden="true" />
            Praticar
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Playground de código</h1>
            <LibrasBadge />
          </div>
          <p className="text-muted">
            Escreva JavaScript e execute no próprio navegador — sem instalar nada. O resultado
            aparece na hora, com feedback visual dos testes.
          </p>
        </header>

        <Card className="flex items-start gap-3 border-brand/30 bg-brand/5 p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-semibold text-ink">Desafio: sua primeira função</span>
            <span className="text-muted">
              Complete a função <code className="text-brand">soma</code> para que os três testes
              abaixo fiquem verdes.
            </span>
          </div>
        </Card>

        <CodePlayground
          starterCode={STARTER}
          tests={TESTS}
          storageKey="pratica-soma"
          height="360px"
        />

        <p className="flex items-center gap-2 text-sm text-muted">
          <Hand className="h-4 w-4 text-brand" aria-hidden="true" />
          Em breve: desafios com vídeo em Libras integrados a cada aula.
        </p>
      </div>
    </main>
  );
}
