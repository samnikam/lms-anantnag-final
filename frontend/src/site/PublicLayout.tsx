import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  ChevronUp,
  LogIn,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { BackToTop, ScrollProgress } from './motion';

/**
 * The public face of the portal — what a parent, a visitor or the department
 * sees before signing in. It is laid out as a school website: a utility strip,
 * a masthead with the crest, a photo-led body and a directory footer.
 */

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

/**
 * The programme's own description of itself. The bid names the R&B Division
 * as Pahalgam, which sits within Anantnag district — both appear, each where
 * it belongs.
 */
export const DIVISION = {
  department: 'Public Works Department, Government of Jammu & Kashmir',
  shortDept: 'PWD, Government of J&K',
  division: 'R&B Division Pahalgam',
  district: 'Anantnag District',
  /** How the programme is named to families, rather than in procurement. */
  programme: 'Anantnag Smart Classrooms',
  session: '2026–27',
};

export const FIGURES = [
  { value: '21', label: 'School sites' },
  { value: '42', label: 'Smart classrooms' },
  { value: '02', label: 'Broadcast studios' },
  { value: '12', label: 'Subjects taught' },
];

/** A page section with consistent rhythm and a centred measure. */
export function Section({
  children,
  className,
  width = 'default',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'narrow';
  /** An anchor, so a link can land on the section. */
  id?: string;
}) {
  return (
    <section id={id} className={clsx('px-5 py-6 sm:px-8 sm:py-10 lg:py-14', className)}>
      <div className={clsx('mx-auto', width === 'narrow' ? 'max-w-3xl' : 'max-w-6xl')}>
        {children}
      </div>
    </section>
  );
}

/** The heading block every section opens with: a rule, a kicker, a title. */
export function SectionHeading({
  kicker,
  title,
  description,
  align = 'center',
  light = false,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  light?: boolean;
}) {
  return (
    <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {kicker && (
        <span
          className={clsx(
            'mb-4 inline-block rounded-full px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.16em]',
            light
              ? 'bg-white/10 text-accent-amber ring-1 ring-white/15'
              : 'bg-accent-coral-soft text-accent-coral-deep',
          )}
        >
          {kicker}
        </span>
      )}
      <h2
        className={clsx(
          'text-[27px] font-extrabold leading-[1.15] tracking-[-0.025em] sm:text-[36px]',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {/* The short rule under a heading, drawn in as the section arrives. */}
      <span
        className={clsx(
          'rule-grow is-in mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-accent-amber to-accent-coral',
          align === 'center' && 'mx-auto',
        )}
      />
      {description && (
        <p
          className={clsx(
            'mt-5 text-[15.5px] leading-relaxed',
            light ? 'text-white/70' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function Crest({
  onClick,
  light = false,
  compact = false,
}: {
  onClick?: () => void;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link to="/" onClick={onClick} className="group flex min-w-0 items-center gap-3">
      <img
        src="/images/logo.png"
        alt=""
        aria-hidden
        className={clsx(
          'shrink-0 object-contain transition-all duration-300 group-hover:scale-110',
          light && 'rounded-full bg-white p-1',
          compact ? 'h-12 w-12' : 'h-16 w-16',
        )}
      />
      <span className="min-w-0 leading-tight">
        <span
          className={clsx(
            'block text-[14px] font-extrabold leading-tight tracking-[-0.02em] sm:truncate sm:text-[16px]',
            light ? 'text-white' : 'text-ink',
          )}
        >
          Anantnag Smart Classrooms
        </span>
        <span
          className={clsx(
            'hidden truncate text-[11px] font-semibold sm:block',
            light ? 'text-white/60' : 'text-muted',
          )}
        >
          {DIVISION.division} · {DIVISION.district}
        </span>
      </span>
    </Link>
  );
}

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // A new page starts at the top, and with the mobile menu closed.
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'relative rounded-lg px-3 py-2 text-[13.5px] font-bold uppercase tracking-[0.04em] transition-colors',
      'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-accent-amber after:transition-transform',
      isActive
        ? 'text-brand-700 after:scale-x-100'
        : 'text-ink-soft after:scale-x-0 hover:text-brand-700 hover:after:scale-x-100',
    );

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollProgress />

      {/* ── Utility strip ───────────────────────────────────────────── */}
      <div className="hidden bg-brand-800 text-white lg:block">
        <div className="mx-auto flex h-10 max-w-6xl items-center gap-6 px-8 text-[12px]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/70">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {DIVISION.district}, Jammu &amp; Kashmir
            </span>
            <span className="flex items-center gap-1.5 text-white/70">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              Through your school office
            </span>
          </div>
        </div>
      </div>

      {/* ── Masthead ────────────────────────────────────────────────── */}
      <header
        className={clsx(
          'sticky top-0 z-40 bg-surface transition-shadow',
          scrolled ? 'shadow-md' : 'shadow-sm',
        )}
      >
        <div
          className={clsx(
            'mx-auto flex max-w-6xl items-center gap-4 px-5 transition-all duration-300 sm:px-8',
            scrolled ? 'h-[64px]' : 'h-[84px]',
          )}
        >
          <Crest compact={scrolled} />

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* The way in, held top-right on every page. */}
          <Link
            to="/login"
            aria-label="Login"
            className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-700 px-3 py-2.5 text-[13.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600 sm:px-5 lg:ml-4"
          >
            <LogIn className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Login</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="shrink-0 rounded-lg bg-paper p-2.5 text-ink-soft ring-1 ring-rule transition-colors hover:text-brand-700 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-rule bg-surface px-5 pb-4 pt-2 lg:hidden" aria-label="Mobile">
            <div className="mx-auto flex max-w-6xl flex-col">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    clsx(
                      'border-b border-rule py-3 text-[14px] font-bold uppercase tracking-[0.04em] last:border-0',
                      isActive ? 'text-brand-700' : 'text-ink-soft',
                    )
                  }
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

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-brand-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Crest light />
            <p className="mt-5 text-[13px] leading-relaxed text-white/55">
              A government school programme bringing specialist teaching to classrooms across
              {DIVISION.district} — taught live from two studios, received on the panel in the
              room, and recorded so no lesson is lost.
            </p>
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-accent-amber">
              Quick Links
            </p>
            <ul className="mt-5 space-y-2.5 text-[13.5px]">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="draw-underline text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-accent-amber">
              Portal
            </p>
            <ul className="mt-5 space-y-2.5 text-[13.5px]">
              <li>
                <Link to="/login" className="draw-underline text-white/60 transition-colors hover:text-white">
                  Student &amp; Parent Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="draw-underline text-white/60 transition-colors hover:text-white">
                  Teacher Login
                </Link>
              </li>
              <li>
                <Link to="/kiosk-login" className="draw-underline text-white/60 transition-colors hover:text-white">
                  Classroom Panel Sign-in
                </Link>
              </li>
              <li>
                <Link to="/verify" className="draw-underline text-white/60 transition-colors hover:text-white">
                  Verify a Certificate
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="draw-underline text-white/60 transition-colors hover:text-white">
                  Forgotten Password
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-accent-amber">
              Division Office
            </p>
            <address className="mt-5 space-y-2.5 text-[13.5px] not-italic leading-relaxed text-white/60">
              <div className="font-semibold text-white/85">{DIVISION.department}</div>
              <div>{DIVISION.division}</div>
              <div>{DIVISION.district}, Jammu &amp; Kashmir</div>
              <div className="pt-2 text-[12.5px] text-white/50">
                Enquiries are handled by your school office in the first instance.
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {DIVISION.shortDept}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 font-semibold text-white/60 transition-colors hover:text-accent-amber"
            >
              Back to top
              <ChevronUp className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}

/**
 * The banner every inner page opens with: a photograph, the page name and a
 * trail back to the front page — the convention on an institutional site.
 */
export function PageBanner({
  title,
  subtitle,
  image,
  imageAlt,
  focus = 'object-center',
}: {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  /** Which part of the photograph to keep when the banner crops it. */
  focus?: string;
}) {
  return (
    <section className="relative h-[260px] overflow-hidden bg-brand-900 sm:h-[320px]">
      <img
        src={image}
        alt={imageAlt ?? ''}
        aria-hidden={!imageAlt}
        className={clsx('absolute inset-0 h-full w-full object-cover', focus)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/75 via-brand-900/42 via-45% to-brand-900/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-900/30 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-[12.5px] font-semibold text-white/55">
          <Link to="/" className="transition-colors hover:text-accent-amber">
            Home
          </Link>
          <span className="px-2 text-white/30">/</span>
          <span className="text-accent-amber">{title}</span>
        </nav>
        <h1 className="over-photo text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[42px]">
          {title}
        </h1>
        {subtitle && (
          <p className="over-photo mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/90">{subtitle}</p>
        )}
        <span className="mt-5 block h-1 w-16 rounded-full bg-accent-amber" />
      </div>
    </section>
  );
}

/**
 * Soft light behind a section. Purely decorative — it sits under the content
 * and never takes a pointer.
 */
export function Backdrop({
  variant = 'warm',
  grid = false,
}: {
  variant?: 'warm' | 'cool' | 'mint';
  grid?: boolean;
}) {
  const orbs = {
    warm: ['bg-accent-coral/15', 'bg-accent-amber/15'],
    cool: ['bg-accent-violet/15', 'bg-accent-sky/15'],
    mint: ['bg-accent-mint/15', 'bg-accent-sky/12'],
  }[variant];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {grid && <div className="grid-pattern absolute inset-0" />}
      <span className={clsx('orb -left-32 -top-24 h-[26rem] w-[26rem]', orbs[0])} />
      <span
        className={clsx('orb -bottom-28 -right-24 h-[22rem] w-[22rem]', orbs[1])}
        style={{ animationDelay: '-7s' }}
      />
    </div>
  );
}
