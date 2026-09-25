export function StateMessage({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-2xl border border-edge bg-card px-4 py-6 text-center text-muted"
    >
      {children}
    </p>
  );
}
