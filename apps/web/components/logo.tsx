/**
 * Marca abstrata "Aprender em Libras": um leque de traços coloridos sobre um
 * arco-base — evoca uma mão acenando/sinalizando em movimento, sem desenhar
 * uma mão realista. Cores fixas da identidade.
 */
export function LogoMark({
  className,
  title = 'Aprender em Libras',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={title}>
      <g strokeWidth="4" strokeLinecap="round" fill="none">
        {/* arco-base (palma / aceno) */}
        <path d="M11 30 Q 24 41 37 30" stroke="#6366f1" />
        {/* leque de traços (dedos / movimento) */}
        <path d="M16 29 L13 15" stroke="#ef4444" />
        <path d="M21.5 29 L20 10" stroke="#fbbf24" />
        <path d="M27 29 L28.5 11" stroke="#10b981" />
        <path d="M32.5 29 L35.5 16" stroke="#a78bfa" />
      </g>
    </svg>
  );
}
