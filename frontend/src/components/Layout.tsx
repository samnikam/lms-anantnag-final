import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bell, GraduationCap, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { api } from '../lib/api';
import { ROLE_LABELS, useAuth } from '../lib/auth';
import { navSectionsFor } from '../lib/nav';

/** Initials for the avatar chip — two letters at most. */
function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: unread } = useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: async () => (await api.get<{ count: number }>('/notifications/unread-count')).data,
    refetchInterval: 60_000,
  });

  if (!user) return null;
  const sections = navSectionsFor(user.role);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — role-filtered navigation */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex w-[264px] shrink-0 flex-col bg-surface transition-transform duration-300 lg:static lg:translate-x-0',
          menuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:shadow-none',
        )}
      >
        <div className="flex shrink-0 items-center gap-3 px-5 pb-2 pt-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-pill">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-extrabold tracking-[-0.02em] text-ink">
              Hybrid Learning
            </p>
            <p className="truncate text-[11px] font-medium text-faint">PWD J&amp;K · Anantnag</p>
          </div>
        </div>

        <nav
          className="scroll-quiet flex-1 overflow-y-auto px-3 pb-6 pt-2"
          aria-label="Main navigation"
        >
          {sections.map((section) => (
            <div key={section.group} className="mb-1">
              {section.label && <p className="eyebrow px-3 pb-2 pt-5">{section.label}</p>}
              <div className="space-y-1">
                {section.items.map(({ to, label, icon: Icon }, i) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'group flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[13px] transition-all duration-200',
                        isActive
                          ? 'bg-brand-700 font-semibold text-white shadow-pill'
                          : 'font-medium text-muted hover:bg-slate-50 hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Set-up screens are numbered: each one needs the one
                            above it to exist first, and saying so beats leaving
                            an admin to work out where to start. */}
                        {section.group === 'setup' ? (
                          <span
                            className={clsx(
                              'num flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md text-[10px] font-bold',
                              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-faint',
                            )}
                          >
                            {i + 1}
                          </span>
                        ) : (
                          <Icon
                            className={clsx(
                              'h-[18px] w-[18px] shrink-0 transition-colors',
                              isActive ? 'text-white' : 'text-faint group-hover:text-brand-600',
                            )}
                            aria-hidden
                          />
                        )}
                        <span className="truncate">{label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between gap-3 bg-paper/85 px-4 backdrop-blur-md lg:px-8">
          <button
            type="button"
            className="rounded-xl bg-surface p-2 text-ink-soft shadow-sm ring-1 ring-rule transition-colors hover:text-ink lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="relative rounded-full bg-surface p-2.5 text-ink-soft shadow-sm ring-1 ring-rule transition-all hover:text-brand-600 hover:shadow"
              aria-label={`Notifications${unread?.count ? `, ${unread.count} unread` : ''}`}
            >
              <Bell className="h-[18px] w-[18px]" />
              {!!unread?.count && (
                <span className="num absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-seal px-1 text-[10px] font-bold text-white ring-2 ring-paper">
                  {unread.count > 9 ? '9+' : unread.count}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-3 shadow-sm ring-1 ring-rule sm:pr-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-[11px] font-bold text-white">
                {initials(user.fullName)}
              </span>
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-[13px] font-semibold text-ink">{user.fullName}</p>
                <p className="text-[11px] font-medium text-faint">{ROLE_LABELS[user.role]}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
              className="btn-secondary !rounded-full"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 pb-10 pt-1 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
