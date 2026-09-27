'use client';

import { Lightbulb } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LibrasTerm } from './libras-term';

function textOf(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(textOf).join('');
  return '';
}

/** Renderiza o conteúdo da aula (Markdown) com o visual da plataforma. */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-4 leading-relaxed text-ink/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">{children}</h2>
          ),
          h2: ({ children }) => (
            <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold tracking-tight text-ink">
              <span className="h-4 w-1 rounded-full bg-brand" aria-hidden="true" />
              {children}
            </h3>
          ),
          h3: ({ children }) => <h4 className="mt-3 text-lg font-semibold text-ink">{children}</h4>,
          p: ({ children }) => <p className="text-ink/85">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          em: ({ children }) => <em className="text-ink/90">{children}</em>,
          a: ({ children, href }) => {
            if (href && href.startsWith('libras:')) {
              return <LibrasTerm id={href.slice('libras:'.length)}>{children}</LibrasTerm>;
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-strong"
              >
                {children}
              </a>
            );
          },
          ul: ({ children }) => <ul className="flex list-none flex-col gap-2 pl-1">{children}</ul>,
          ol: ({ children }) => (
            <ol className="flex list-decimal flex-col gap-2 pl-6 marker:text-brand">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 [ol_&]:list-item [ol_&]:pl-1">
              <span
                className="mt-2 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-brand [ul_&]:block"
                aria-hidden="true"
              />
              <span className="flex-1">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="my-1 flex gap-3 rounded-xl border border-brand/30 bg-brand/5 p-4">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <div className="flex flex-col gap-2 text-ink/90 [&>p]:m-0">{children}</div>
            </div>
          ),
          hr: () => <hr className="my-2 border-edge" />,
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-xl border border-edge bg-elevated/70 p-4 font-mono text-sm leading-relaxed text-ink/90 shadow-inner">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
            const raw = textOf(children);
            const isBlock = raw.includes('\n') || /language-/.test(className ?? '');
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-md bg-elevated px-1.5 py-0.5 font-mono text-[0.9em] text-brand">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-xl border border-edge">
              <table className="w-full text-left text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-edge bg-elevated px-3 py-2 font-semibold text-ink">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-edge px-3 py-2 text-ink/85">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
