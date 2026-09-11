import clsx from 'clsx';
import { AlertCircle, Inbox, Loader2, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/** The pastel tile families an icon can sit in. One accent per idea. */
const ACCENTS = {
  brand: 'bg-tint-brand text-brand-600',
  coral: 'bg-tint-coral text-accent-coral',
  mint: 'bg-tint-mint text-accent-mint',
  sky: 'bg-tint-sky text-accent-sky',
  amber: 'bg-tint-amber text-accent-amber',
  violet: 'bg-tint-violet text-accent-violet',
} as const;

export type Accent = keyof typeof ACCENTS;

/** A pastel square holding a line icon — the reference's recurring motif. */
export function IconTile({
  icon: Icon,
  accent = 'brand',
  className,
}: {
  icon: LucideIcon;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span className={clsx('icon-tile', ACCENTS[accent], className)}>
      <Icon className="h-[18px] w-[18px]" aria-hidden />
    </span>
  );
}

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
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-ink">{title}</h1>
        {description && <p className="mt-1.5 max-w-3xl text-[13.5px] text-muted">{description}</p>}
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
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 pb-1 pt-5">
          {title && (
            <h2 className="text-[15px] font-bold tracking-[-0.01em] text-ink">{title}</h2>
          )}
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = 'default',
  icon,
  accent,
  delta,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: 'default' | 'good' | 'warn' | 'bad';
  /** Optional pastel icon tile, as in the reference's figure cards. */
  icon?: LucideIcon;
  accent?: Accent;
  /** A short trailing chip — a change, a share, a count out of a total. */
  delta?: string;
}) {
  const tones = {
    default: 'text-ink',
    good: 'text-attained',
    warn: 'text-accent-amber',
    bad: 'text-seal',
  };
  /* A card carrying a tone borrows its tile colour from it, so the figure and
     its icon never disagree. */
  const toneAccent: Record<string, Accent> = {
    default: 'brand',
    good: 'mint',
    warn: 'amber',
    bad: 'coral',
  };
  return (
    <div className="card p-5 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {icon && <IconTile icon={icon} accent={accent ?? toneAccent[tone]} />}
          <p className="label truncate">{label}</p>
        </div>
        {delta && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-muted">
            {delta}
          </span>
        )}
      </div>
      <p className={clsx('num mt-3 text-[30px] font-extrabold leading-none', tones[tone])}>
        {value}
      </p>
      {hint && <p className="mt-2 text-[12px] text-faint">{hint}</p>}
    </div>
  );
}

/** Consistent loading state — never a blank screen. */
export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-muted">
      <Loader2 className="h-5 w-5 animate-spin text-brand-600" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-tint-coral py-12 text-center">
      <span className="icon-tile bg-white/70 text-seal">
        <AlertCircle className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <p className="max-w-md px-4 text-[13.5px] font-medium text-seal">{message}</p>
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
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <span className="icon-tile mb-1 bg-slate-100 text-faint">
        <Inbox className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      {description && <p className="max-w-md text-[13px] text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

const BADGE_TONES: Record<string, string> = {
  neutral: 'bg-slate-100 text-muted',
  good: 'bg-tint-mint text-attained',
  warn: 'bg-tint-amber text-[#b87708]',
  bad: 'bg-tint-coral text-seal',
  info: 'bg-tint-brand text-brand-600',
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
        'inline-flex items-center rounded-full px-2.5 py-[3px] text-[11px] font-semibold capitalize',
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
        <div className="mb-1.5 flex justify-between text-[12px]">
          <span className="font-medium text-ink-soft">{label}</span>
          <span className="num font-semibold text-ink">{pct}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            pct >= 75 ? 'bg-attained' : pct >= 40 ? 'bg-brand-500' : 'bg-accent-coral',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="scroll-quiet -mx-1 overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={h || i} scope="col" className="th">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr>td]:border-t [&>tr>td]:border-rule [&>tr:hover>td]:bg-slate-50">
          {children}
        </tbody>
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
      <label className="label mb-1.5 !font-semibold !text-ink-soft">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[12px] text-faint">{hint}</p>}
      {error && <p className="mt-1.5 text-[12px] font-medium text-seal">{error}</p>}
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="scroll-quiet max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-t-xl bg-surface px-6 py-4">
          <h2 className="text-[17px] font-bold tracking-[-0.01em] text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-faint transition-colors hover:bg-slate-100 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="px-6 pb-5">{children}</div>
        {footer && (
          <footer className="sticky bottom-0 flex justify-end gap-2 rounded-b-xl border-t border-rule bg-surface px-6 py-4">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
