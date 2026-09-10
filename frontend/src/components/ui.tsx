import clsx from 'clsx';
import { AlertCircle, Inbox, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-4">
      <div className="min-w-0">
        <h1 className="font-serif text-[22px] leading-tight text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-3xl text-[13px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx('card', className)}>
      {(title || action) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-3 py-2">
          {title && <h2 className="label !text-ink">{title}</h2>}
          {action}
        </header>
      )}
      <div className="p-3">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = 'default',
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: 'default' | 'good' | 'warn' | 'bad';
}) {
  const tones = {
    default: 'text-ink',
    good: 'text-attained',
    warn: 'text-seal',
    bad: 'text-seal',
  };
  return (
    <div className="card p-3">
      <p className="label">{label}</p>
      <p className={clsx('num mt-1.5 text-[22px] leading-none', tones[tone])}>{value}</p>
      {hint && <p className="mt-1.5 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}

/** Consistent loading state — never a blank screen. */
export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-ink-soft">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-seal/30 bg-seal/5 py-10 text-center">
      <AlertCircle className="h-6 w-6 text-seal" aria-hidden />
      <p className="max-w-md text-sm text-seal">{message}</p>
      {onRetry && (
        <button type="button" className="btn-secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-10 text-center">
      <Inbox className="mb-1 h-5 w-5 text-faint" aria-hidden />
      <p className="text-[13px] font-medium text-ink">{title}</p>
      {description && <p className="max-w-md text-[13px] text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

const BADGE_TONES: Record<string, string> = {
  neutral: 'border-rule bg-surface text-muted',
  good: 'border-attained/30 bg-surface text-attained',
  warn: 'border-seal/30 bg-surface text-seal',
  bad: 'bg-seal/5 text-seal',
  info: 'bg-brand-100 text-brand-800',
};

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: keyof typeof BADGE_TONES;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center border px-1.5 py-px text-[11px] font-medium uppercase tracking-[0.06em]',
        BADGE_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Maps the API status vocabulary onto badge tones in one place. */
export function StatusBadge({ status }: { status: string }) {
  const tone =
    /PUBLISHED|ACTIVE|ONLINE|PRESENT|COMPLETED|GRADED|APPROVED|RESOLVED|PASSED/.test(status)
      ? 'good'
      : /DRAFT|PENDING|SCHEDULED|IN_REVIEW|OPEN|SUBMITTED|IN_PROGRESS|ASSIGNED/.test(status)
        ? 'info'
        : /LATE|WARN|ESCALATED|MAINTENANCE|FALLBACK_RECORDED|EXCUSED/.test(status)
          ? 'warn'
          : /ABSENT|OFFLINE|CANCELLED|FAILED|REVOKED|SUSPENDED|DEACTIVATED|REJECTED/.test(status)
            ? 'bad'
            : 'neutral';
  return <Badge tone={tone as any}>{status.replace(/_/g, ' ').toLowerCase()}</Badge>;
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs text-ink-soft">
          <span>{label}</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden bg-rule"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={clsx(
            'h-full transition-all',
            pct >= 75 ? 'bg-attained' : pct >= 40 ? 'bg-ink-soft' : 'bg-seal',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="scroll-quiet overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-rule">
          <tr>
            {headers.map((h, i) => (
              <th key={h || i} scope="col" className="th">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rule bg-surface [&>tr:hover]:bg-paper">{children}</tbody>
      </table>
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="label">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-seal">{error}</p>}
    </div>
  );
}

/** Modal with a confirmation affordance for destructive actions (§7). */
export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="scroll-quiet max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-rule bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 z-10 border-b border-rule bg-surface px-4 py-3">
          <h2 className="font-serif text-[17px] text-ink">{title}</h2>
        </header>
        <div className="px-4 py-4">{children}</div>
        {footer && (
          <footer className="sticky bottom-0 flex justify-end gap-2 border-t border-rule bg-paper px-4 py-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
