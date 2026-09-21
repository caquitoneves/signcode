'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthMe } from '@projetox/contracts';
import { authApi } from './auth-api';

interface AuthContextValue {
  user: AuthMe | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string, name?: string): Promise<void>;
  logout(): Promise<void>;
  reload(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthMe | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      let me = await authApi.me();
      if (!me) {
        // access token pode ter expirado — tenta refresh silencioso
        try {
          await authApi.refresh();
          me = await authApi.me();
        } catch {
          me = null;
        }
      }
      setUser(me);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const login = useCallback(async (email: string, password: string) => {
    await authApi.login({ email, password });
    setUser(await authApi.me());
  }, []);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    await authApi.register({ email, password, name });
    setUser(await authApi.me());
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, reload }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
