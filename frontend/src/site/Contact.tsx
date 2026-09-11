import { Link } from 'react-router-dom';
import { Building2, FileBadge, KeyRound, LifeBuoy, MapPin, MonitorPlay } from 'lucide-react';
import { IconTile, type Accent } from '../components/ui';
import { DIVISION, Section, SectionHeading } from './PublicLayout';
import { Reveal } from './motion';

/**
 * Who to approach for what. The portal issues no accounts of its own — a
 * school or the division office does — so the most useful thing this page can
 * do is route each kind of request to the right desk.
 */
const ROUTES: Array<{
  icon: typeof KeyRound;
  accent: Accent;
  title: string;
  body: string;
  action?: { to: string; label: string };
}> = [
  {
    icon: KeyRound,
    accent: 'brand',
    title: 'I cannot sign in',
    body: 'Accounts are issued by your school office. If you have an account but have forgotten the password, the sign-in page can send you a reset link.',
    action: { to: '/login', label: 'Go to sign-in' },
  },
  {
    icon: LifeBuoy,
    accent: 'mint',
    title: 'Something in the portal is wrong',
    body: 'Raise a support ticket from inside the portal — it reaches the division office with your school and role already attached, so nothing has to be explained twice.',
  },
  {
    icon: FileBadge,
    accent: 'amber',
    title: 'I need to check a certificate',
    body: 'Certificates issued by the portal carry a verification code. Anyone can confirm one is genuine without holding an account.',
    action: { to: '/verify', label: 'Verify a certificate' },
  },
  {
    icon: MonitorPlay,
    accent: 'coral',
    title: 'A classroom panel is not working',
    body: 'Report it through your school office. Panels report their own status to the portal, so the division office can usually see the fault before it is described.',
  },
];

export function ContactPage() {
  return (
    <>
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow mb-4 !text-brand-500">Contact</p>
          <h1 className="max-w-3xl text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[42px]">
            Get to the right desk
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
            Most things are handled by your own school office. The division office looks after the
            platform itself, the panels and the programme as a whole.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {ROUTES.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 110}>
            <article className="card-interactive flex h-full flex-col p-7">
              <IconTile icon={r.icon} accent={r.accent} />
              <h2 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-ink">{r.title}</h2>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-muted">{r.body}</p>
              {r.action && (
                <Link
                  to={r.action.to}
                  className="mt-5 inline-flex w-fit items-center rounded-full bg-tint-brand px-4 py-2 text-[12.5px] font-bold text-brand-600 transition-colors hover:bg-brand-100"
                >
                  {r.action.label}
                </Link>
              )}
            </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" width="narrow">
        <SectionHeading eyebrow="Division office" title="Where the programme is run from" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[20px] bg-paper p-7">
            <IconTile icon={Building2} accent="brand" />
            <h3 className="mt-5 text-[15px] font-bold text-ink">Department</h3>
            <address className="mt-2.5 space-y-1 text-[13.5px] not-italic leading-relaxed text-muted">
              <div className="font-semibold text-ink-soft">{DIVISION.department}</div>
              <div>{DIVISION.division}</div>
            </address>
          </div>

          <div className="rounded-[20px] bg-paper p-7">
            <IconTile icon={MapPin} accent="violet" />
            <h3 className="mt-5 text-[15px] font-bold text-ink">Location</h3>
            <address className="mt-2.5 space-y-1 text-[13.5px] not-italic leading-relaxed text-muted">
              <div>Anantnag</div>
              <div>Jammu &amp; Kashmir, India</div>
            </address>
          </div>
        </div>

        <div className="card mt-5 p-7">
          <p className="label">Programme reference</p>
          <p className="code mt-2 text-[15px] font-semibold text-ink">{DIVISION.tender}</p>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            Quote this reference in any correspondence about the programme. Exact desk contacts
            are issued to each school by the division office rather than published here.
          </p>
        </div>
      </Section>
    </>
  );
}
