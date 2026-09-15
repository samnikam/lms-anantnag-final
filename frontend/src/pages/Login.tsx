import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Loader2, MonitorPlay } from 'lucide-react';
import { errorMessage } from '../lib/api';
import { useAuth } from '../lib/auth';
import { Field } from '../components/ui';
import { DIVISION, FIGURES } from '../site/PublicLayout';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(identifier.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(errorMessage(err, 'Sign-in failed. Check your credentials and try again.'));
    } finally {
      setBusy(false);
    }
  }

  return (
    // A photograph of one of the schools fills the page; the form sits on a
    // white sheet at the right, the way the public site's banners are built.
    <div className="relative min-h-screen bg-brand-900">
      <img
        src="/images/school-entrance.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[55%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-900/55 to-brand-900/25" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:flex-row lg:items-stretch lg:gap-12">
        {/* ── The programme, over the photograph ─────────────────────── */}
        <section className="flex flex-1 flex-col justify-between py-4 text-white lg:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-md">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <div className="text-[18px] font-extrabold tracking-[-0.02em]">{DIVISION.programme}</div>
                <div className="text-[11.5px] font-medium text-white/65">{DIVISION.division}</div>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[12.5px] font-bold text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Website
            </Link>
          </div>

          <div className="over-photo max-w-[44ch] py-14 lg:py-0">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-accent-amber">
              Portal sign-in
            </p>
            <h1 className="mt-4 text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">
              One record for every classroom in the district.
            </h1>
            <p className="mt-5 text-[15.5px] leading-relaxed text-white/80">
              Timetables, attendance, lessons and results for the government schools of{' '}
              {DIVISION.district} — each school with its own view, and the division office with
              the whole picture.
            </p>
          </div>

          <dl className="hidden gap-8 border-t border-white/20 pt-6 sm:flex">
            {FIGURES.map((f) => (
              <div key={f.label}>
                <dd className="num text-[26px] font-extrabold leading-none">{f.value}</dd>
                <dt className="mt-1.5 text-[11.5px] font-medium text-white/60">{f.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ── The form, on a white sheet ─────────────────────────────── */}
        <section className="flex items-center py-4 lg:w-[440px] lg:py-8">
          <form
            onSubmit={onSubmit}
            className="w-full rounded-3xl bg-white p-7 shadow-2xl ring-1 ring-black/5 sm:p-9"
          >
            <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-ink">Sign in</h2>
            <p className="mt-1.5 text-[13.5px] text-muted">
              Use the credentials issued by your school or the division office.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl bg-tint-coral px-4 py-3 text-[13px] font-medium text-seal"
              >
                {error}
              </div>
            )}

            <div className="mt-6">
              <Field label="Email, username or mobile">
                <input
                  className="input"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                  autoFocus
                />
              </Field>

              <Field label="Password">
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </Field>
            </div>

            <div className="mb-4 text-right">
              <Link
                to="/forgot-password"
                className="text-[12px] font-semibold text-brand-600 hover:underline"
              >
                Forgotten your password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center !py-3 !text-[14px]"
              disabled={busy}
            >
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
              {busy ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="mt-6 border-t border-rule pt-5">
              <Link to="/kiosk-login" className="btn w-full justify-center !py-2.5">
                <MonitorPlay className="h-3.5 w-3.5" aria-hidden />
                Sign in as a classroom panel
              </Link>
              <p className="mt-2.5 text-center text-[11px] text-faint">
                For shared interactive panels and OPS PCs in classrooms.
              </p>
            </div>

            <p className="mt-6 text-center text-[11px] text-faint">
              {DIVISION.shortDept} · Session {DIVISION.session}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
