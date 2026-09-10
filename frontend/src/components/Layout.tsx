import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bell, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { api } from '../lib/api';
import { ROLE_LABELS, useAuth } from '../lib/auth';
import { navSectionsFor } from '../lib/nav';

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
          'fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-rule bg-surface transition-transform lg:static lg:translate-x-0',
          menuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="shrink-0 border-b border-rule px-4 py-3.5">
          <p className="truncate font-serif text-[17px] font-semibold text-ink">Hybrid Learning</p>
          <p className="label mt-0.5 truncate">PWD J&amp;K · Anantnag</p>
        </div>

        <nav
          className="scroll-quiet flex-1 overflow-y-auto px-2 pb-6 pt-1"
          aria-label="Main navigation"
        >
          {sections.map((section) => (
            <div key={section.group} className="mb-1">
              {section.label && (
                <p className="label px-2.5 pb-1 pt-4 !text-faint">{section.label}</p>
              )}
              <div className="space-y-0.5">
                {section.items.map(({ to, label, icon: Icon }, i) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'relative flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] transition-colors',
                        'before:absolute before:inset-y-0 before:left-0 before:w-[2px]',
                        isActive
                          ? 'bg-paper font-semibold text-ink before:bg-ink'
                          : 'font-normal text-muted before:bg-transparent hover:bg-paper hover:text-ink',
                      )
                    }
                  >
                    {/* Set-up screens are numbered: each one needs the one
                        above it to exist first, and saying so beats leaving an
                        admin to work out where to start. */}
                    {section.group === 'setup' ? (
                      <span className="num w-4 shrink-0 text-center text-[11px] text-faint">
                        {i + 1}
                      </span>
                    ) : (
                      <Icon className="h-[14px] w-[14px] shrink-0" aria-hidden />
                    )}
                    <span className="truncate">{label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-rule bg-surface px-4 lg:px-6">
          <button
            type="button"
            className="p-2 text-muted hover:text-ink lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-muted transition-colors hover:text-ink"
              aria-label={`Notifications${unread?.count ? `, ${unread.count} unread` : ''}`}
            >
              <Bell className="h-5 w-5" />
              {!!unread?.count && (
                <span className="num absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center bg-seal px-1 text-[10px] font-medium text-white">
                  {unread.count > 9 ? '9+' : unread.count}
                </span>
              )}
            </button>

            <div className="hidden border-l border-rule pl-4 text-right sm:block">
              <p className="text-[13px] font-medium leading-tight text-ink">{user.fullName}</p>
              <p className="label mt-0.5">{ROLE_LABELS[user.role]}</p>
            </div>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
              className="btn-secondary"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
