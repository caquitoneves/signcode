/**
 * Marca "SignCode": a forma abstrata inspirada em código e tecnologia,
 * com os colchetes de programação < > em contraste com o arco base.
 */
export function LogoMark({
  className,
  title = 'SignCode',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        strokeWidth="5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        {/* Colchetes retos */}
        <path
          d="M9 20H4V45H9M55 20H60V45H55"
          stroke="#4338ca"
        />

        {/* Base angular e traços coloridos independentes */}
        <path
          d="M14 40L23 47L32 50L41 47L50 40"
          stroke="#6366f1"
        />
        <path d="M20 37L17 23" stroke="#ef4444" />
        <path d="M28 36L27 14" stroke="#fbbf24" />
        <path d="M36 36L37 12" stroke="#10b981" />
        <path d="M44 37L47 23" stroke="#a78bfa" />
      </g>
    </svg>
  );
}