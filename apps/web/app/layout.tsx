import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { ToastRegion } from '@/components/toast-region';
import { AuthProvider } from '@/lib/auth-context';
import { ProfileProvider } from '@/lib/profile-context';
import { QueryProvider } from '@/lib/query-provider';
import { PrefsProvider } from '@/lib/prefs-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'SignCode — Aprender programação em Libras',
  description: 'Educação em tecnologia com Libras como língua de ensino de primeira classe.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <QueryProvider>
          <PrefsProvider>
            <AuthProvider>
              <ProfileProvider>
                <ToastRegion />
                <Navbar />
                <div className="min-h-[calc(100vh-3.5rem)]">{children}</div>
              </ProfileProvider>
            </AuthProvider>
          </PrefsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
