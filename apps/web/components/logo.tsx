/**
 * Marca "Aprender em Libras": o leque abstrato colorido com arco-base (mão /
 * aceno / movimento) abraçado pelos colchetes de código < >. Cores fixas.
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
      <g strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M12.5 13 L6.5 24 L12.5 35" stroke="#6366f1" />
        <path d="M35.5 13 L41.5 24 L35.5 35" stroke="#10b981" />
      </g>
      {/* leque abstrato: arco-base + traços */}
      <g strokeLinecap="round" fill="none">
        <path d="M15.5 29.5 Q 24 38 32.5 29.5" stroke="#6366f1" strokeWidth="4" />
        <g strokeWidth="3.6">
          <path d="M18 29 L15.8 16.5" stroke="#ef4444" />
          <path d="M21.7 29 L20.6 12" stroke="#fbbf24" />
          <path d="M26.3 29 L27.4 12" stroke="#10b981" />
          <path d="M30 29 L32.2 16.5" stroke="#a78bfa" />
        </g>
      </g>
    </svg>
  );
}
