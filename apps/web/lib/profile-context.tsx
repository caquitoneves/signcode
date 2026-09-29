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
import { useAuth } from './auth-context';

export type ProfileTheme = 'violet' | 'indigo' | 'emerald';

export interface UserProfile {
  name: string;
  username: string;
  bio: string;
  pronouns: 'Ela / Dela' | 'Ele / Dele' | 'Não informar';
  city: string;
  learningGoal: string;
  theme: ProfileTheme;
  emailReminders: boolean;
  weeklySummary: boolean;
  courseRecommendations: boolean;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Seu nome',
  username: '@signcode',
  bio: 'Aprendendo tecnologia com foco em acessibilidade e prática.',
  pronouns: 'Não informar',
  city: 'Brasil',
  learningGoal: 'Avançar em lógica e desenvolvimento web.',
  theme: 'violet',
  emailReminders: true,
  weeklySummary: true,
  courseRecommendations: true,
};

const STORAGE_KEY = 'signcode:profile';

interface ProfileContextValue {
  profile: UserProfile;
  hydrated: boolean;
  updateProfile: (patch: Partial<UserProfile>) => void;
  reset: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

function read(): UserProfile {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(read());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage indisponível; ignora silenciosamente
    }
  }, [hydrated, profile]);

  // Semeia o nome com o do usuário logado enquanto o perfil ainda estiver no padrão.
  useEffect(() => {
    const seededName = user?.name;
    if (!hydrated || !seededName) return;
    setProfile((prev) =>
      prev.name === DEFAULT_PROFILE.name ? { ...prev, name: seededName } : prev,
    );
  }, [hydrated, user]);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora
    }
    setProfile(DEFAULT_PROFILE);
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({ profile, hydrated, updateProfile, reset }),
    [profile, hydrated, updateProfile, reset],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile deve ser usado dentro de <ProfileProvider>');
  return ctx;
}
