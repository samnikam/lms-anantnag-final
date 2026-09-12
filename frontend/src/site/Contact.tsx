import { Link } from 'react-router-dom';
import { Building2, FileBadge, KeyRound, LifeBuoy, MapPin, MonitorPlay } from 'lucide-react';
import { DIVISION, Section } from './PublicLayout';
import { Marker, Reveal } from './motion';
import { Blob, Doodle } from './illustrations';

type Tone = 'coral' | 'mint' | 'sky' | 'amber' | 'violet';

const TONE = {
  coral: { soft: 'bg-accent-coral-soft', solid: 'bg-accent-coral', text: 'text-accent-coral-deep' },
  mint: { soft: 'bg-accent-mint-soft', solid: 'bg-accent-mint', text: 'text-accent-mint-deep' },
  sky: { soft: 'bg-accent-sky-soft', solid: 'bg-accent-sky', text: 'text-accent-sky-deep' },
  amber: { soft: 'bg-accent-amber-soft', solid: 'bg-accent-amber', text: 'text-accent-amber-deep' },
  violet: {
    soft: 'bg-accent-violet-soft',
    solid: 'bg-accent-violet',
    text: 'text-accent-violet-deep',
  },
} as const;

/**
 * Who to approach for what. The portal issues no accounts of its own — a
 * school or the division office does — so the most useful thing this page can
 * do is route each kind of request to the right desk.
 */
const ROUTES: Array<{
  icon: typeof KeyRound;
  tone: Tone;
  title: string;
  body: string;
  action?: { to: string; label: string };
}> = [
  {
    icon: KeyRound,
    tone: 'coral',
    title: 'I cannot sign in',
    body: 'Accounts are issued by your school office. If you have one but have forgotten the password, the sign-in page can send you a reset link.',
    action: { to: '/login', label: 'Go to sign-in' },
  },
  {
    icon: LifeBuoy,
    tone: 'mint',
    title: 'Something in the portal is wrong',
    body: 'Raise a support ticket from inside the portal — it reaches the division office with your school and role already attached, so nothing is explained twice.',
  },
  {
    icon: FileBadge,
    tone: 'amber',
    title: 'I need to check a certificate',
    body: 'Certificates issued by the portal carry a verification code. Anyone can confirm one is genuine without holding an account.',
    action: { to: '/verify', label: 'Verify a certificate' },
  },
  {
    icon: MonitorPlay,
    tone: 'violet',
    title: 'A classroom panel is not working',
    body: 'Report it through your school office. Panels report their own status, so the division office can usually see the fault before it is described.',
  },
];

export function ContactPage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f3fbf8] via-paper to-paper">
        <Blob className="-left-28 -top-20 h-[26rem] w-[26rem] blur-2xl" color="#e0f7f0" opacity={0.95} />
        <Blob className="-right-24 top-24 h-80 w-80 blur-2xl" color="#fde7ef" opacity={0.9} />
        <Doodle kind="squiggle" className="anim-float absolute right-[10%] bottom-[14%] h-14 w-14" color="#f5a623" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-5 !text-accent-mint-deep">Contact</p>
            <h1 className="max-w-3xl text-[38px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[54px] lg:text-[62px]">
              Get to the{' '}
              <Marker color="#ffc9dd">
                <span>right desk</span>
              </Marker>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              Most things are handled by your own school office. The division office looks after
              the platform itself, the panels, and the programme as a whole.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ ROUTES ═════════════════════════════════════════════════════ */}
      <Section className="!pt-4">
        <div className="grid gap-5 md:grid-cols-2">
          {ROUTES.map((r, i) => {
            const t = TONE[r.tone];
            return (
              <Reveal key={r.title} delay={(i % 2) * 110}>
                <article className={`block-card ${t.soft} flex h-full flex-col`}>
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-[18px] ${t.solid} text-white shadow-sm`}
                  >
                    <r.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-6 text-[21px] font-extrabold tracking-[-0.02em] text-ink">
                    {r.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                  {r.action && (
                    <Link
                      to={r.action.to}
                      className="mt-6 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-[13.5px] font-bold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
                    >
                      {r.action.label}
                    </Link>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ THE OFFICE — dark band ═════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <Doodle kind="dots" className="absolute left-[6%] top-[18%] h-16 w-16 opacity-25" color="#ffffff" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-white/50">
              Division office
            </p>
            <h2 className="mt-5 text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[40px]">
              Where the programme is run from
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Building2,
                title: 'Department',
                lines: [DIVISION.department, DIVISION.division],
              },
              { icon: MapPin, title: 'Location', lines: ['Anantnag', 'Jammu & Kashmir, India'] },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 110}>
                <div className="block-card h-full bg-white/[0.06] ring-1 ring-white/10">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/15 text-white">
                    <b.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[18px] font-extrabold text-white">{b.title}</h3>
                  <address className="mt-2.5 space-y-1 text-[14px] not-italic leading-relaxed text-white/65">
                    {b.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </address>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mt-5 rounded-[24px] bg-accent-amber p-7">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-accent-amber-deep">
                Programme reference
              </p>
              <p className="code mt-2 text-[19px] font-extrabold text-ink">{DIVISION.tender}</p>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink/75">
                Quote this in any correspondence about the programme. Exact desk contacts are
                issued to each school by the division office rather than published here.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
