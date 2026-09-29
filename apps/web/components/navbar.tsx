'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Building2,
  ChevronDown,
  Code2,
  Compass,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Settings,
  User,
  UserPlus,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@signcode/ui';
import { useAuth } from '../lib/auth-context';
import { useCourseProgress, useLesson } from '../lib/queries';
import { LogoMark } from './logo';
import { Button } from './ui';

function NavLink({
  href,
  active,
  light,
  icon,
  children,
  onClick,
  className,
}: {
  href: string;
  active: boolean;
  light: boolean;
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        active
          ? light
            ? 'bg-brand/10 font-medium text-brand-strong'
            : 'bg-brand/10 font-medium text-brand'
          : light
            ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            : 'text-muted hover:bg-elevated hover:text-ink',
        className,
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname() ?? '/';
  const light = pathname === '/';

  // "Cursos" é uma área própria (/cursos + /aulas); a landing (/) é só a home.
  const isCourses = pathname.startsWith('/cursos') || pathname.startsWith('/aulas');
  const isPratica = pathname.startsWith('/pratica');
  const isPainel = pathname.startsWith('/painel');

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fecha os menus ao trocar de rota.
  useEffect(() => {
    setMenuOpen(false);
    setUserMenu(false);
  }, [pathname]);

  // Fecha o dropdown do usuário ao clicar fora.
  useEffect(() => {
    if (!userMenu) return;
    function onDoc(e: MouseEvent): void {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenu(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [userMenu]);

  // Barra de progresso do curso durante as aulas (usa o cache das queries).
  const lessonId = pathname.match(/^\/aulas\/([^/]+)/)?.[1] ?? '';
  const { data: lessonData } = useLesson(lessonId);
  const courseSlug = lessonId ? (lessonData?.courseSlug ?? '') : '';
  const { data: courseProgress } = useCourseProgress(courseSlug, Boolean(user));
  const pct =
    courseProgress && courseProgress.total > 0
      ? Math.round((courseProgress.completed / courseProgress.total) * 100)
      : null;
  const showProgress = Boolean(lessonId) && pct !== null;

  const displayName = user?.name?.trim() || user?.email || '';
  const initial = (displayName[0] ?? '?').toUpperCase();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur',
        light ? 'border-slate-200 bg-white/85' : 'border-edge bg-canvas/80',
      )}
    >
      {/* Progresso do curso (só nas aulas) */}
      {showProgress ? (
        <div
          className="h-1 w-full bg-brand/10"
          role="progressbar"
          aria-valuenow={pct ?? 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do curso"
        >
          <div
            className="h-full bg-brand transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : null}

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="SignCode — início"
          className="group flex min-w-0 shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <LogoMark className="h-9 w-9 shrink-0" title="Símbolo SignCode" />
          <span
            className={cn(
              'hidden font-semibold tracking-tight min-[380px]:inline',
              light ? 'text-slate-900' : '',
            )}
          >
            Sign<span className="text-brand">Code</span>
          </span>
        </Link>

        {/* Links (desktop) */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 text-sm sm:flex">
          <NavLink
            href="/cursos"
            active={isCourses}
            light={light}
            icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
          >
            Cursos
          </NavLink>
          {user ? (
            <NavLink
              href="/pratica"
              active={isPratica}
              light={light}
              icon={<Code2 className="h-4 w-4" aria-hidden="true" />}
            >
              Praticar
            </NavLink>
          ) : (
            <>
              <NavLink
                href="/#como-funciona"
                active={false}
                light={light}
                icon={<Compass className="h-4 w-4" aria-hidden="true" />}
              >
                Como funciona
              </NavLink>
              <NavLink
                href="/#para-empresas"
                active={false}
                light={light}
                icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
              >
                Para empresas
              </NavLink>
            </>
          )}
        </nav>

        {/* Ações à direita */}
        <div className="flex items-center gap-1">
          {/* Área do usuário (desktop) */}
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            {loading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-elevated" aria-hidden="true" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenu((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenu}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    light ? 'hover:bg-slate-100' : 'hover:bg-elevated',
                  )}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-fg"
                    aria-hidden="true"
                  >
                    {initial}
                  </span>
                  <span
                    className={cn(
                      'hidden max-w-[9rem] truncate text-sm font-medium md:inline',
                      light ? 'text-slate-700' : 'text-ink',
                    )}
                  >
                    {user.name ?? user.email}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      light ? 'text-slate-500' : 'text-muted',
                      userMenu && 'rotate-180',
                    )}
                    aria-hidden="true"
                  />
                </button>

                {userMenu ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right animate-fade-in overflow-hidden rounded-xl border border-edge bg-card shadow-lg"
                  >
                    <div className="border-b border-edge px-4 py-3">
                      <p className="truncate text-sm font-medium text-ink">
                        {user.name ?? 'Conta'}
                      </p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    <Link
                      href="/painel"
                      role="menuitem"
                      aria-current={isPainel ? 'page' : undefined}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-elevated"
                    >
                      <LayoutDashboard className="h-4 w-4 text-muted" aria-hidden="true" />
                      Meu painel
                    </Link>
                    <Link
                      href="/perfil"
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-elevated"
                    >
                      <User className="h-4 w-4 text-muted" aria-hidden="true" />
                      Perfil
                    </Link>
                    <Link
                      href="/configuracoes"
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-elevated"
                    >
                      <Settings className="h-4 w-4 text-muted" aria-hidden="true" />
                      Configurações
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => void logout()}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-elevated"
                    >
                      <LogOut className="h-4 w-4 text-muted" aria-hidden="true" />
                      Sair
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <NavLink
                  href="/entrar"
                  active={pathname.startsWith('/entrar')}
                  light={light}
                  icon={<LogIn className="h-4 w-4" aria-hidden="true" />}
                >
                  Entrar
                </NavLink>
                <Link href="/cadastro">
                  <Button size="sm">
                    <UserPlus className="h-4 w-4" aria-hidden="true" />
                    Criar conta
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Botão do menu (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:hidden',
              light ? 'text-slate-700 hover:bg-slate-100' : 'text-ink hover:bg-elevated',
            )}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Painel do menu (mobile) */}
      {menuOpen ? (
        <div
          id="menu-mobile"
          className={cn(
            'animate-fade-in border-t sm:hidden',
            light ? 'border-slate-200 bg-white' : 'border-edge bg-canvas',
          )}
        >
          <nav
            aria-label="Navegação principal"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm"
          >
            <NavLink
              href="/cursos"
              active={isCourses}
              light={light}
              icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
              onClick={() => setMenuOpen(false)}
            >
              Cursos
            </NavLink>

            {loading ? null : user ? (
              <>
                <NavLink
                  href="/pratica"
                  active={isPratica}
                  light={light}
                  icon={<Code2 className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Praticar
                </NavLink>

                <div className="my-1 border-t border-edge" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-fg"
                    aria-hidden="true"
                  >
                    {initial}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">{user.name ?? 'Conta'}</span>
                    <span className="truncate text-xs text-muted">{user.email}</span>
                  </span>
                </div>
                <NavLink
                  href="/painel"
                  active={isPainel}
                  light={light}
                  icon={<LayoutDashboard className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Meu painel
                </NavLink>
                <NavLink
                  href="/perfil"
                  active={pathname.startsWith('/perfil')}
                  light={light}
                  icon={<User className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Perfil
                </NavLink>
                <NavLink
                  href="/configuracoes"
                  active={pathname.startsWith('/configuracoes')}
                  light={light}
                  icon={<Settings className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Configurações
                </NavLink>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    void logout();
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    light
                      ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-muted hover:bg-elevated hover:text-ink',
                  )}
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <NavLink
                  href="/#como-funciona"
                  active={false}
                  light={light}
                  icon={<Compass className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Como funciona
                </NavLink>
                <NavLink
                  href="/#para-empresas"
                  active={false}
                  light={light}
                  icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Para empresas
                </NavLink>
                <div className="my-1 border-t border-edge" />
                <NavLink
                  href="/entrar"
                  active={pathname.startsWith('/entrar')}
                  light={light}
                  icon={<LogIn className="h-4 w-4" aria-hidden="true" />}
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar
                </NavLink>
                <Link href="/cadastro" onClick={() => setMenuOpen(false)} className="mt-1">
                  <Button size="sm" className="w-full">
                    <UserPlus className="h-4 w-4" aria-hidden="true" />
                    Criar conta
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
