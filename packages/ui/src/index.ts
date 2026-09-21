import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes condicionais e resolve conflitos do Tailwind.
 * Base para os componentes de UI (e para shadcn/ui, adicionado quando construirmos o player).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
