'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthMe } from '@signcode/contracts';
import { authApi } from './auth-api';
import { showToast } from './toast';

interface AuthContextValue {
  user: AuthMe | null;
  loading: boolean;
  login(email: string, password: string, remember?: boolean): Promise<void>;
  register(email: string, password: string, name?: string, remember?: boolean): Promise<void>;
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
    } catch (error) {
      setUser(null);
      const message = error instanceof Error ? error.message : 'Não foi possível verificar sua sessão.';
      showToast({
        title: 'Sessão indisponível',
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const login = useCallback(async (email: string, password: string, remember = true) => {
    try {
      await authApi.login({ email, password, remember });
      const nextUser = await authApi.me();
      setUser(nextUser);
      showToast({
        title: 'Login realizado',
        description: 'Você entrou com sucesso.',
        variant: 'success',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível entrar.';
      showToast({
        title: 'Não foi possível entrar',
        description: message,
        variant: 'error',
      });
      throw error;
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name?: string, remember = true) => {
      try {
        await authApi.register({ email, password, name, remember });
        const nextUser = await authApi.me();
        setUser(nextUser);
        showToast({
          title: 'Conta criada',
          description: 'Sua conta foi criada com sucesso.',
          variant: 'success',
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Não foi possível criar sua conta.';
        showToast({
          title: 'Não foi possível criar a conta',
          description: message,
          variant: 'error',
        });
        throw error;
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      showToast({
        title: 'Sessão encerrada',
        description: 'Você saiu com sucesso.',
        variant: 'info',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível encerrar a sessão.';
      showToast({
        title: 'Falha ao sair',
        description: message,
        variant: 'error',
      });
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
