import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, MonitorPlay } from 'lucide-react';
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
    // The masthead carries the department; the form sits on paper beside it.
    <div className="min-h-screen lg:grid lg:grid-cols-[1fr_520px]">
      <section className="flex flex-col justify-between bg-ink px-6 py-8 lg:px-12 lg:py-12">
        <div>
          <div className="font-serif text-[26px] font-semibold text-white">Hybrid Learning</div>
          <div className="label mt-1 !text-white/50">Learning Management System · v1.0</div>
        </div>

        <div className="max-w-[46ch] py-10">
          <h1 className="font-serif text-[24px] font-semibold leading-snug text-white">
            Public Works Department, Jammu &amp; Kashmir
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            R&amp;B Division Anantnag. Hybrid classrooms across the division, taught from two
            studios and received on interactive panels at every site.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="label !text-white/40">Sites</dt>
              <dd className="num mt-1 text-[20px] text-white">21</dd>
            </div>
            <div>
              <dt className="label !text-white/40">Panels</dt>
              <dd className="num mt-1 text-[20px] text-white">42</dd>
            </div>
            <div>
              <dt className="label !text-white/40">Studios</dt>
              <dd className="num mt-1 text-[20px] text-white">02</dd>
            </div>
            <div>
              <dt className="label !text-white/40">Session</dt>
              <dd className="num mt-1 text-[20px] text-white">2026&ndash;27</dd>
            </div>
          </dl>
        </div>

        <p className="num text-[11px] text-white/40">
          Encrypted sign-in · hashed credentials · session expiry enforced
        </p>
      </section>

      <section className="bg-paper px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[440px]">
          <h2 className="font-serif text-[21px] font-semibold text-ink">Sign in</h2>
          <p className="mt-1 text-[13px] text-muted">
            Use the credentials issued by your school or the division office.
          </p>

        <form onSubmit={onSubmit} className="card mt-4 p-4">
          {error && (
            <div
              role="alert"
              className="mb-3 border border-seal/30 bg-surface px-3 py-2 text-[13px] text-seal"
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
            <Link to="/forgot-password" className="text-xs text-brand-700 hover:underline">
              Forgotten your password?
            </Link>
          </div>

          <button type="submit" className="btn-primary mt-4 w-full justify-center !py-2" disabled={busy}>
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-4 border-t border-rule pt-3">
            <Link to="/kiosk-login" className="btn w-full justify-center">
              <MonitorPlay className="h-3.5 w-3.5" aria-hidden />
              Sign in as a classroom panel
            </Link>
            <p className="mt-2 text-center text-[11px] text-muted">
              For shared interactive panels and OPS PCs in classrooms.
            </p>
          </div>
        </form>

        <div className="card mt-5">
          <header className="flex items-center justify-between gap-3 border-b border-rule px-3 py-2">
            <div className="label !text-ink">Evaluation accounts</div>
            <div className="num text-[11px] text-muted">{DEMO_PASSWORD}</div>
          </header>
          <ul>
            {DEMO_ACCOUNTS.map((account) => (
              <li
                key={account.email}
                className="flex items-center gap-3 border-b border-rule px-3 py-2 last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-ink">{account.role}</div>
                  <div className="num truncate text-[11px] text-muted">{account.email}</div>
                </div>
                <div className="hidden text-[13px] text-muted sm:block">{account.scope}</div>
                <button
                  type="button"
                  className="btn ml-auto"
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

        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Every account above uses the same password and exists only in the demonstration data.
        </p>
        </div>
      </section>
    </div>
  );
}
