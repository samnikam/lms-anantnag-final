import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { GraduationCap, LogIn, Menu, X } from 'lucide-react';
import clsx from 'clsx';

/**
 * The public face of the portal — what someone sees before they sign in.
 *
 * It shares the portal's tokens (brand, tint, rule, the display face) so the
 * two halves read as one product, but it keeps its own shell: a marketing
 * page wants a wide header and a footer, not the portal's sidebar.
 */

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/platform', label: 'Platform' },
  { to: '/contact', label: 'Contact' },
];

/** The department's own description of itself, kept in one place. */
export const DIVISION = {
  department: 'Public Works Department, Jammu & Kashmir',
  division: 'R&B Division Anantnag',
  programme: 'Hybrid Learning Portal',
  tender: 'GEM/2026/B/7822845',
  session: '2026–27',
};

export const FIGURES = [
  { value: '21', label: 'School sites' },
  { value: '42', label: 'Interactive panels' },
  { value: '02', label: 'Broadcast studios' },
  { value: DIVISION.session, label: 'Academic session' },
];

/** A page section with consistent rhythm and a centred measure. */
export function Section({
  children,
  className,
  width = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'narrow';
}) {
  return (
    <section className={clsx('px-5 py-16 sm:px-8 lg:py-24', className)}>
      <div className={clsx('mx-auto', width === 'narrow' ? 'max-w-3xl' : 'max-w-6xl')}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={clsx('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="eyebrow mb-3 !text-brand-500">{eyebrow}</p>}
      <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.025em] text-ink sm:text-[32px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex shrink-0 items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-pill">
        <GraduationCap className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[15px] font-extrabold tracking-[-0.02em] text-ink">
          Hybrid Learning
        </span>
        <span className="block truncate text-[11px] font-medium text-faint">
          PWD J&amp;K · Anantnag
        </span>
      </span>
    </Link>
  );
}

export function PublicLayout() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors',
      isActive ? 'bg-tint-brand text-brand-600' : 'text-muted hover:bg-slate-50 hover:text-ink',
    );

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-4 px-5 sm:px-8">
          <Brand />

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* The way in, kept top-right on every page. */}
          <Link to="/login" className="btn-primary ml-auto !rounded-full lg:ml-3">
            <LogIn className="h-4 w-4" aria-hidden />
            Login
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-xl bg-surface p-2 text-ink-soft shadow-sm ring-1 ring-rule transition-colors hover:text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-rule bg-surface px-5 py-3 lg:hidden" aria-label="Mobile">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
              A hybrid classroom programme for {DIVISION.division}: lessons taught from two
              studios and received on interactive panels at schools across the division.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Portal</p>
            <ul className="space-y-2 text-[13px]">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted transition-colors hover:text-brand-600">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-muted transition-colors hover:text-brand-600">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-muted transition-colors hover:text-brand-600">
                  Verify a certificate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Office</p>
            <address className="space-y-2 text-[13px] not-italic leading-relaxed text-muted">
              <div className="font-semibold text-ink-soft">{DIVISION.department}</div>
              <div>{DIVISION.division}</div>
              <div>Anantnag, Jammu &amp; Kashmir</div>
              <div className="code text-[11px] text-faint">{DIVISION.tender}</div>
            </address>
          </div>
        </div>

        <div className="border-t border-rule">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {DIVISION.department}. All rights reserved.
            </p>
            <p>Session {DIVISION.session} · Encrypted sign-in · Role-based access</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
