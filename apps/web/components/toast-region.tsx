'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@signcode/ui';
import { subscribeToToast, type AppToast } from '@/lib/toast';

type ToastItem = AppToast & { id: number };

const toastStyles: Record<NonNullable<AppToast['variant']>, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
};

export function ToastRegion() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToast((toast) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { ...toast, id }]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id));
      }, toast.duration ?? 4000);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-sm',
              toastStyles[toast.variant ?? 'info'],
            )}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-sm opacity-90">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              aria-label="Fechar aviso"
              className="rounded-md p-1 opacity-75 transition-opacity hover:opacity-100"
              onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
