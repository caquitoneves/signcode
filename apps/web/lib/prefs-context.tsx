'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type LanguagePref = 'pt-BR' | 'libras';
export type FontScale = 'normal' | 'large' | 'xlarge';

export interface Prefs {
  /** Idioma de preferência para a interface e o destaque de conteúdo. */
  language: LanguagePref;
  /** Abrir legenda por padrão nas aulas. */
  captionsDefault: boolean;
  /** Mostrar o intérprete de Libras por padrão nas aulas. */
  interpreterDefault: boolean;
  /** Reduzir animações (além da preferência do sistema operacional). */
  reduceMotion: boolean;
  /** Tamanho base da fonte. */
  fontScale: FontScale;
  /** Onboarding concluído. */
  onboarded: boolean;
}

export const DEFAULT_PREFS: Prefs = {
  language: 'libras',
  captionsDefault: true,
  interpreterDefault: true,
  reduceMotion: false,
  fontScale: 'normal',
  onboarded: false,
};

const STORAGE_KEY = 'signcode:prefs';

interface PrefsContextValue {
  prefs: Prefs;
  hydrated: boolean;
  setPrefs: (patch: Partial<Prefs>) => void;
  reset: () => void;
}

const PrefsContext = createContext<PrefsContextValue | null>(null);

function read(): Prefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setState] = useState<Prefs>(DEFAULT_PREFS);
  const [hydrated, setHydrated] = useState(false);

  // Hidrata do localStorage após a montagem (evita mismatch de SSR).
  useEffect(() => {
    setState(read());
    setHydrated(true);
  }, []);

  // Aplica preferências que afetam o documento inteiro.
  useEffect(() => {
    if (!hydrated) return;
    const el = document.documentElement;
    el.dataset.fontScale = prefs.fontScale;
    el.classList.toggle('reduce-motion', prefs.reduceMotion);
  }, [hydrated, prefs.fontScale, prefs.reduceMotion]);

  const setPrefs = useCallback((patch: Partial<Prefs>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignora (modo privado / storage bloqueado)
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora
    }
    setState(DEFAULT_PREFS);
  }, []);

  const value = useMemo<PrefsContextValue>(
    () => ({ prefs, hydrated, setPrefs, reset }),
    [prefs, hydrated, setPrefs, reset],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): PrefsContextValue {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs deve ser usado dentro de <PrefsProvider>');
  return ctx;
}
