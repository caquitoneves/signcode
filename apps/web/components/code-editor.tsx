'use client';

import dynamic from 'next/dynamic';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// CodeMirror toca em APIs do navegador — carrega só no cliente.
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] w-full items-center justify-center rounded-xl border border-edge bg-elevated text-sm text-muted">
      Carregando editor…
    </div>
  ),
});

export function CodeEditor({
  value,
  onChange,
  height = '320px',
  ariaLabel = 'Editor de código',
}: {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  ariaLabel?: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-edge focus-within:ring-2 focus-within:ring-brand"
      aria-label={ariaLabel}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={oneDark}
        extensions={[javascript()]}
        height={height}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          tabSize: 2,
          autocompletion: true,
        }}
      />
    </div>
  );
}
