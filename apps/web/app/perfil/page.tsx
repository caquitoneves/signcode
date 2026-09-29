'use client';

import Link from 'next/link';
import { Camera, Edit3, MapPin, Sparkles } from 'lucide-react';
import { useProfile } from '@/lib/profile-context';
import { Button, Card } from '@/components/ui';

export default function PerfilPage() {
  const { profile } = useProfile();

  return (
    <main className="aurora min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <header className="overflow-hidden rounded-[30px] border border-brand/10 bg-[radial-gradient(circle_at_top_left,_rgba(192,132,252,0.18),_transparent_24%),linear-gradient(135deg,#fff,#f7f7ff)] p-6 shadow-[0_22px_80px_rgba(99,102,241,0.08)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-violet-500 text-2xl font-bold text-white shadow-lg">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white text-brand shadow-sm"
                  aria-label="Alterar foto de perfil"
                >
                  <Camera className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div>
                <p className="text-sm text-muted">Perfil</p>
                <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
                <p className="text-sm text-brand">{profile.username}</p>
              </div>
            </div>

            <Link href="/configuracoes">
              <Button variant="secondary">
                <Edit3 className="h-4 w-4" aria-hidden="true" />
                Editar perfil
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2 text-brand">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-ink">Sobre você</h2>
            </div>
            <p className="leading-relaxed text-muted">{profile.bio}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-edge bg-elevated p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">Pronome</p>
                <p className="mt-2 font-medium text-ink">{profile.pronouns}</p>
              </div>
              <div className="rounded-2xl border border-edge bg-elevated p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">Local</p>
                <p className="mt-2 flex items-center gap-2 font-medium text-ink">
                  <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                  {profile.city}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2 text-brand">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-ink">Objetivo</h2>
            </div>
            <p className="rounded-2xl border border-dashed border-brand/30 bg-brand/5 p-4 text-muted">
              {profile.learningGoal}
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
