import { Link } from 'react-router-dom';
import {
  Building2,
  FileBadge,
  KeyRound,
  LifeBuoy,
  MapPin,
  MonitorPlay,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from './motion';
import { TONE, type Tone } from './tone';
import { ABOUT } from './media';
import { DIVISION, PageBanner, Section, SectionHeading } from './PublicLayout';

/** What families ask most often, answered without sending them elsewhere. */
const FAQS: Array<[string, string]> = [
  [
    'How do we get an account for the portal?',
    'Accounts are created by your school once a learner is enrolled. Students, parents and teachers each get their own sign-in; nobody needs to register themselves on this site.',
  ],
  [
    'My child missed a live class. Is it lost?',
    'No. Every studio session is recorded and linked afterwards to each class that was scheduled to receive it, so it can be watched later from the portal.',
  ],
  [
    'Do students need their own laptop or phone?',
    'Not for class. The lesson arrives on the panel in the room, which signs in as a shared classroom device. A personal account is only needed to check work, results or attendance from home.',
  ],
  [
    'What happens if the internet or power fails during a lesson?',
    'Each site has a battery-backed power supply, lessons can be cached on the classroom computer in advance, and video quality adapts to a weak link. If a feed is lost, the recording stands in.',
  ],
  [
    'How will we know if attendance falls behind?',
    'The portal calculates attendance continuously and alerts guardians automatically below the 75% requirement — in the portal, by email, and by SMS where a family has no reliable data connection.',
  ],
  [
    'Can a parent see another child\u2019s records?',
    'No. A parent account is linked to their own children only, and the check is made on the server for every request. Parents can view results and attendance but cannot change them.',
  ],
  [
    'How is a certificate checked by a college or employer?',
    'Each certificate carries a unique number and a verification code. Anyone can confirm it on this site without holding an account.',
  ],
  [
    'Which languages is the portal available in?',
    'English, Hindi, Urdu and Kashmiri are planned for the interface, so families are not held back by the language of a screen.',
  ],
];

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
    body: 'Raise a support ticket from inside the portal. It reaches the division office with your school and role already attached, and follows a defined escalation path.',
  },
  {
    icon: FileBadge,
    tone: 'amber',
    title: 'I need to check a certificate',
    body: 'Certificates issued by the portal carry a unique number and verification code. Anyone can confirm one is genuine without holding an account.',
    action: { to: '/verify', label: 'Verify a certificate' },
  },
  {
    icon: MonitorPlay,
    tone: 'violet',
    title: 'A classroom panel is not working',
    body: 'Report it through your school office. Panels report their own status to the portal, so the division office can usually see the fault before it is described.',
  },
];

export function ContactPage() {
  // One answer open at a time, so the list stays scannable.
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageBanner
        title="Contact"
        subtitle="Most things are handled by your own school office. The division office looks after the platform, the panels and the programme as a whole."
        image={ABOUT.campus.src}
        imageAlt={ABOUT.campus.alt}
      />

      {/* ══ ROUTES ═════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="How can we help?"
          title="Get to the right desk"
          description="Find what you need below — each goes to the people who can actually resolve it."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ROUTES.map((r, i) => {
            const t = TONE[r.tone];
            return (
            <Reveal key={r.title} variant={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 110}>
              <article className={`flex h-full flex-col rounded-2xl ${t.soft} p-8`}>
                <span
                  className={`icon-pop inline-flex h-14 w-14 items-center justify-center rounded-xl ${t.solid} ${t.on} shadow-sm`}
                >
                  <r.icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-6 text-[20px] font-extrabold tracking-[-0.02em] text-ink">
                  {r.title}
                </h2>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{r.body}</p>
                {r.action && (
                  <Link
                    to={r.action.to}
                    className="mt-6 inline-flex w-fit items-center rounded-lg bg-white px-5 py-2.5 text-[13.5px] font-bold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
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

      {/* ══ FAQ ════════════════════════════════════════════════════════ */}
      <Section className="bg-surface" width="narrow">
        <SectionHeading
          kicker="Questions & answers"
          title="What families ask most"
          description="If your question is not here, your school office can answer it."
        />

        <div className="mt-14 space-y-3">
          {FAQS.map(([q, a], i) => {
            const isOpen = openFaq === i;
            return (
              <Reveal key={q} delay={Math.min(i * 60, 300)}>
                <div className="overflow-hidden rounded-xl bg-paper ring-1 ring-rule">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="text-[15px] font-bold text-ink">{q}</span>
                      <ChevronDown
                        className={clsx(
                          'h-5 w-5 shrink-0 text-brand-700 transition-transform duration-300',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <p className="border-t border-rule px-5 py-4 text-[14px] leading-relaxed text-muted">
                      {a}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ THE OFFICE ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <img
          src="/images/school-corridor.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading
            kicker="Division office"
            title="Where the programme is run from"
            align="left"
            light
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-white/[0.07] p-8 ring-1 ring-white/10">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-xl bg-white/15 p-3 text-white">
                  <Building2 className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-extrabold text-white">Department</h3>
                <address className="mt-3 space-y-1.5 text-[14.5px] not-italic leading-relaxed text-white/65">
                  <div className="font-semibold text-white/90">{DIVISION.department}</div>
                  <div>{DIVISION.division}</div>
                </address>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="h-full rounded-2xl bg-white/[0.07] p-8 ring-1 ring-white/10">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-xl bg-white/15 p-3 text-white">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-extrabold text-white">Location</h3>
                <address className="mt-3 space-y-1.5 text-[14.5px] not-italic leading-relaxed text-white/65">
                  <div>{DIVISION.district}</div>
                  <div>Jammu &amp; Kashmir, India</div>
                </address>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="mt-6 rounded-2xl bg-accent-amber p-8">
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-ink/10 p-3 text-ink">
                  <ShieldCheck className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-[16rem] flex-1">
                  <p className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-ink/60">
                    Before you write to the office
                  </p>
                  <p className="mt-1.5 text-[19px] font-extrabold text-ink">
                    Your school can answer most questions
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-ink/75">
                Enrolment, accounts, timetables and results are all held by your own school.
                Contact details for each school are issued to families directly rather than
                published here, and the division office handles the platform and the equipment
                behind it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
