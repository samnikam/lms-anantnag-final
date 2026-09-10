import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, MonitorPlay } from 'lucide-react';
import { errorMessage } from '../lib/api';
import { useAuth } from '../lib/auth';
import { Field } from '../components/ui';

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
            R&amp;B Division Pahalgam. Hybrid classrooms across the division, taught from two
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
        </div>
      </section>
    </div>
  );
}
