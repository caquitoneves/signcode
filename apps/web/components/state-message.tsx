export function StateMessage({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-6 text-center text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
    >
      {children}
    </p>
  );
}
