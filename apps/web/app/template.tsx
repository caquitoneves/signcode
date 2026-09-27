import type { ReactNode } from 'react';

// Remonta a cada navegação -> dá uma transição suave em todas as páginas.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-fade-up">{children}</div>;
}
