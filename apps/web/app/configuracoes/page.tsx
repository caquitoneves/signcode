'use client';

import { Save, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { useProfile } from '@/lib/profile-context';
import { Button, Card } from '@/components/ui';

export default function ConfiguracoesPage() {
  const { profile, updateProfile } = useProfile();

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <header className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Configurações
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Perfil e preferências</h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <UserCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-muted">Perfil público</p>
                <h2 className="text-xl font-semibold">Dados básicos</h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                Nome
                <input
                  value={profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="rounded-xl border border-edge bg-elevated px-3 py-2.5 text-ink outline-none transition focus:border-brand"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                Usuário
                <input
                  value={profile.username}
                  onChange={(e) => updateProfile({ username: e.target.value })}
                  className="rounded-xl border border-edge bg-elevated px-3 py-2.5 text-ink outline-none transition focus:border-brand"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
                Bio
                <textarea
                  value={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  rows={3}
                  className="rounded-xl border border-edge bg-elevated px-3 py-2.5 text-ink outline-none transition focus:border-brand"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                Pronome
                <select
                  value={profile.pronouns}
                  onChange={(e) =>
                    updateProfile({ pronouns: e.target.value as typeof profile.pronouns })
                  }
                  className="rounded-xl border border-edge bg-elevated px-3 py-2.5 text-ink outline-none transition focus:border-brand"
                >
                  <option>Ela / Dela</option>
                  <option>Ele / Dele</option>
                  <option>Não informar</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                Cidade
                <input
                  value={profile.city}
                  onChange={(e) => updateProfile({ city: e.target.value })}
                  className="rounded-xl border border-edge bg-elevated px-3 py-2.5 text-ink outline-none transition focus:border-brand"
                />
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-muted">Preferências</p>
                <h2 className="text-xl font-semibold">Privacidade e notificações</h2>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailReminders', label: 'Lembretes por e-mail' },
                { key: 'weeklySummary', label: 'Resumo semanal' },
                { key: 'courseRecommendations', label: 'Recomendações de cursos' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-edge bg-elevated p-3"
                >
                  <span className="text-sm font-medium text-ink">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={profile[item.key as keyof typeof profile] as boolean}
                    onChange={(e) =>
                      updateProfile({ [item.key]: e.target.checked } as Partial<typeof profile>)
                    }
                    className="h-4 w-4 accent-brand"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-brand/5 p-4">
              <p className="text-sm font-medium text-brand">Objetivo de aprendizado</p>
              <textarea
                value={profile.learningGoal}
                onChange={(e) => updateProfile({ learningGoal: e.target.value })}
                rows={3}
                className="mt-3 w-full rounded-xl border border-edge bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
              />
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-end">
          <Button
            onClick={() =>
              showToast({
                title: 'Alterações salvas',
                description: 'Seu perfil foi atualizado.',
                variant: 'success',
              })
            }
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Salvar alterações
          </Button>
        </div>
      </div>
    </main>
  );
}
