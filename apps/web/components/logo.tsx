/**
 * Marca "Aprender em Libras": colchetes de código (< >) abraçando um leque
 * abstrato de traços coloridos (evoca mão acenando/sinalizando, sem mão
 * realista). Cores fixas da identidade.
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
      {/* colchetes de código */}
      <g strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M15 13 L7 24 L15 35" stroke="#6366f1" />
        <path d="M33 13 L41 24 L33 35" stroke="#10b981" />
      </g>
      {/* leque abstrato (mão / movimento) */}
      <g strokeWidth="3.6" strokeLinecap="round" fill="none">
        <path d="M20 31 L17.5 16" stroke="#ef4444" />
        <path d="M24 31 L24 13" stroke="#fbbf24" />
        <path d="M28 31 L30.5 16" stroke="#a78bfa" />
      </g>
    </svg>
  );
}
