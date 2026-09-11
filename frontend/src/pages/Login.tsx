import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2, MonitorPlay } from 'lucide-react';
import { errorMessage } from '../lib/api';
import { useAuth } from '../lib/auth';
import { Field } from '../components/ui';

/**
 * The seeded accounts, offered so an evaluator can sign in as each role without
 * being handed a list separately.
 *
 * These exist only in the demonstration seed. Remove this block — and the
 * accounts — before the portal carries real staff and learners.
 */
const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'admin@lms.gov.in', scope: 'All schools' },
  { role: 'Academic Admin', email: 'academic@lms.gov.in', scope: 'Division-wide' },
  { role: 'Academic Admin', email: 'academic.site2@lms.gov.in', scope: 'One school' },
  { role: 'Teacher', email: 'teacher@lms.gov.in', scope: 'Own classes' },
  { role: 'Student', email: 'student@lms.gov.in', scope: 'Own learning' },
  { role: 'Parent', email: 'parent@lms.gov.in', scope: "Own child" },
];

const DEMO_PASSWORD = 'Password@123';

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
    // The masthead carries the department; the form sits on the canvas beside it.
    <div className="min-h-screen bg-paper p-0 lg:grid lg:grid-cols-[1fr_540px] lg:gap-6 lg:p-6">
      <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-10 lg:rounded-[28px] lg:px-14 lg:py-14">
        {/* Two soft lights behind the panel, the way the reference glows. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-violet/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent-coral/20 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/15 text-white backdrop-blur-sm">
            <GraduationCap className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <div className="text-[19px] font-extrabold tracking-[-0.02em] text-white">
              Hybrid Learning
            </div>
            <div className="text-[11px] font-medium text-white/55">
              Learning Management System · v1.0
            </div>
          </div>
        </div>

        <div className="relative max-w-[46ch] py-12">
          <h1 className="text-[30px] font-extrabold leading-[1.2] tracking-[-0.025em] text-white lg:text-[34px]">
            Public Works Department, Jammu &amp; Kashmir
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            R&amp;B Division Anantnag. Hybrid classrooms across the division, taught from two
            studios and received on interactive panels at every site.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: 'Sites', v: '21' },
              { k: 'Panels', v: '42' },
              { k: 'Studios', v: '02' },
              { k: 'Session', v: '2026–27' },
            ].map((stat) => (
              <div
                key={stat.k}
                className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm ring-1 ring-white/10"
              >
                <dt className="text-[11px] font-medium text-white/50">{stat.k}</dt>
                <dd className="num mt-1 text-[19px] font-bold text-white">{stat.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="relative text-[11px] font-medium text-white/45">
          Encrypted sign-in · hashed credentials · session expiry enforced
        </p>
      </section>

      <section className="px-4 py-10 lg:flex lg:items-center lg:px-6 lg:py-6">
        <div className="mx-auto w-full max-w-[440px]">
          <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-ink">Sign in</h2>
          <p className="mt-1.5 text-[13.5px] text-muted">
            Use the credentials issued by your school or the division office.
          </p>

        <form onSubmit={onSubmit} className="card mt-5 p-6">
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl bg-tint-coral px-4 py-3 text-[13px] font-medium text-seal"
            >
              {error}
            </div>
          )}

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

          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-[12px] font-semibold text-brand-600 hover:underline">
              Forgotten your password?
            </Link>
          </div>

          <button type="submit" className="btn-primary mt-5 w-full justify-center !py-3 !text-[14px]" disabled={busy}>
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-5 border-t border-rule pt-5">
            <Link to="/kiosk-login" className="btn w-full justify-center !py-2.5">
              <MonitorPlay className="h-3.5 w-3.5" aria-hidden />
              Sign in as a classroom panel
            </Link>
            <p className="mt-2.5 text-center text-[11px] text-faint">
              For shared interactive panels and OPS PCs in classrooms.
            </p>
          </div>
        </form>

        <div className="card mt-5 overflow-hidden">
          <header className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3.5">
            <div className="text-[13px] font-bold text-ink">Evaluation accounts</div>
            <div className="code rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-muted">{DEMO_PASSWORD}</div>
          </header>
          <ul>
            {DEMO_ACCOUNTS.map((account) => (
              <li
                key={account.email}
                className="flex items-center gap-3 border-b border-rule px-5 py-3 transition-colors last:border-b-0 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-ink">{account.role}</div>
                  <div className="truncate text-[11.5px] text-muted">{account.email}</div>
                </div>
                <div className="hidden text-[12px] text-faint sm:block">{account.scope}</div>
                <button
                  type="button"
                  className="btn ml-auto !px-3 !py-1.5 !text-[12px]"
                  onClick={() => {
                    setIdentifier(account.email);
                    setPassword(DEMO_PASSWORD);
                    setError('');
                  }}
                >
                  Fill
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-faint">
          Every account above uses the same password and exists only in the demonstration data.
        </p>
        </div>
      </section>
    </div>
  );
}
