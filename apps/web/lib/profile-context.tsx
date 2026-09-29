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
import { profileApi } from './profile-api';

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
  saving: boolean;
  updateProfile: (patch: Partial<UserProfile>) => void;
  save: () => Promise<void>;
  reset: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

function readLocal(): UserProfile {
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
  const { user, reload } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);

  // Hidrata do localStorage na primeira renderização (instantâneo, offline).
  useEffect(() => {
    setProfile(readLocal());
    setHydrated(true);
  }, []);

  // Cache local (offline / visitante).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage indisponível; ignora
    }
  }, [hydrated, profile]);

  // Fonte de verdade: carrega do servidor quando logado (mantém defaults onde vier vazio).
  useEffect(() => {
    if (!user) return;
    let active = true;
    profileApi
      .get()
      .then((remote) => {
        if (!active || !remote) return;
        setProfile((prev) => ({
          name: remote.name ?? prev.name,
          username: remote.username ?? prev.username,
          bio: remote.bio ?? prev.bio,
          pronouns: (remote.pronouns as UserProfile['pronouns']) ?? prev.pronouns,
          city: remote.city ?? prev.city,
          learningGoal: remote.learningGoal ?? prev.learningGoal,
          theme: (remote.theme as ProfileTheme) ?? prev.theme,
          emailReminders: remote.emailReminders ?? prev.emailReminders,
          weeklySummary: remote.weeklySummary ?? prev.weeklySummary,
          courseRecommendations: remote.courseRecommendations ?? prev.courseRecommendations,
        }));
      })
      .catch(() => {
        // mantém o que veio do cache local
      });
    return () => {
      active = false;
    };
  }, [user]);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const save = useCallback(async () => {
    if (!user) return; // visitante: fica só no cache local
    setSaving(true);
    try {
      await profileApi.update({
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        pronouns: profile.pronouns,
        city: profile.city,
        learningGoal: profile.learningGoal,
        theme: profile.theme,
        emailReminders: profile.emailReminders,
        weeklySummary: profile.weeklySummary,
        courseRecommendations: profile.courseRecommendations,
      });
      // Nome mora no User: recarrega a sessão para o navbar refletir na hora.
      await reload();
    } finally {
      setSaving(false);
    }
  }, [user, profile, reload]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora
    }
    setProfile(DEFAULT_PROFILE);
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({ profile, hydrated, saving, updateProfile, save, reset }),
    [profile, hydrated, saving, updateProfile, save, reset],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile deve ser usado dentro de <ProfileProvider>');
  return ctx;
}
