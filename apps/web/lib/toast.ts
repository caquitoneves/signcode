export type AppToast = {
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'info';
  duration?: number;
};

type ToastListener = (toast: AppToast) => void;

const listeners = new Set<ToastListener>();

export function subscribeToToast(listener: ToastListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function showToast(toast: AppToast) {
  for (const listener of listeners) {
    listener(toast);
  }
}
