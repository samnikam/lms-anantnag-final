import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import { DIVISION, FIGURES, Section } from './PublicLayout';
import { CountUp, Marker, Reveal } from './motion';
import { Blob, Doodle, WaveDivider } from './illustrations';

const PROBLEM = [
  {
    n: '01',
    title: 'A subject teacher cannot be at every school',
    body: 'Specialist teachers are scarce and spread thin across a division. A class without one simply goes without that subject.',
  },
  {
    n: '02',
    title: 'Records lived in separate registers',
    body: 'Attendance in one book, marks in another, the timetable on a noticeboard — with no way to see a learner whole, or a school at a glance.',
  },
  {
    n: '03',
    title: 'Material was rebuilt at every school',
    body: 'The same lesson prepared many times over, to an uneven standard, with no shared library to draw on.',
  },
];

const APPROACH = [
  {
    icon: Radio,
    tone: 'coral',
    title: 'Teach once, receive everywhere',
    body: 'Two studios broadcast to interactive panels in classrooms across the division, so one specialist teacher reaches many schools in the same period.',
  },
  {
    icon: Building2,
    tone: 'violet',
    title: 'One record for the division',
    body: 'Timetable, attendance, assignments, results and certificates in a single system — each school seeing its own, the office seeing all of them.',
  },
  {
    icon: ShieldCheck,
    tone: 'mint',
    title: 'Access decided on the server',
    body: 'Every request is checked against the signed-in role and the school it belongs to. Hiding a link is not treated as security.',
  },
  {
    icon: Sparkles,
    tone: 'amber',
    title: 'Built for uneven connectivity',
    body: 'Sessions are recorded for later viewing, and classroom panels sign in as shared devices rather than requiring an account per learner.',
  },
] as const;

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

export function AboutPage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff6f9] via-paper to-paper">
        <Blob className="-right-32 -top-24 h-[28rem] w-[28rem] blur-2xl" color="#ffe3ee" opacity={0.9} />
        <Blob className="-left-28 top-40 h-80 w-80 blur-2xl" color="#e0f7f0" opacity={0.9} />
        <Doodle kind="dots" className="absolute right-[10%] bottom-[12%] h-16 w-16 opacity-50" color="#8b7cf6" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-5 !text-accent-coral-deep">About the programme</p>
            <h1 className="max-w-4xl text-[38px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[54px] lg:text-[62px]">
              A full curriculum, within reach of{' '}
              <Marker color="#a6f0d8">
                <span>every school</span>
              </Marker>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              The {DIVISION.programme} is an initiative of the {DIVISION.department},{' '}
              {DIVISION.division}. It pairs classroom hardware with a single portal, so a lesson
              taught in one place can be received, recorded and accounted for everywhere.
            </p>
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {FIGURES.map((f, i) => {
              const tones = ['coral', 'violet', 'mint', 'amber'] as const;
              const t = TONE[tones[i]];
              return (
                <Reveal key={f.label} delay={i * 90}>
                  <div className={`block-card ${t.soft} h-full`}>
                    <dd className={`num text-[42px] font-extrabold leading-none ${t.text}`}>
                      <CountUp value={f.value} />
                    </dd>
                    <dt className="mt-3 text-[13px] font-bold text-ink-soft">{f.label}</dt>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ══ THE PROBLEM — dark band ════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <Doodle kind="arc" className="anim-float absolute right-[6%] top-[18%] h-16 w-16 opacity-30" color="#f2789f" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-white/50">
              The problem
            </p>
            <h2 className="mt-5 max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[44px]">
              What the division set out to solve
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {PROBLEM.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <article className="block-card h-full bg-white/[0.06] ring-1 ring-white/10">
                  <span className="num text-[34px] font-extrabold text-accent-coral">{p.n}</span>
                  <h3 className="mt-4 text-[19px] font-extrabold tracking-[-0.02em] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <WaveDivider className="block h-16 w-full sm:h-24" fill="#f5f6fb" />
      </section>

      {/* ══ THE APPROACH ═══════════════════════════════════════════════ */}
      <Section className="!pt-6">
        <Reveal>
          <p className="eyebrow mb-4 !text-accent-mint-deep">The approach</p>
          <h2 className="max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[44px]">
            How the portal answers it
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {APPROACH.map((a, i) => {
            const t = TONE[a.tone];
            return (
              <Reveal key={a.title} delay={(i % 2) * 110}>
                <article className={`block-card ${t.soft} flex h-full gap-6`}>
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${t.solid} text-white shadow-sm`}
                  >
                    <a.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[20px] font-extrabold tracking-[-0.02em] text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{a.body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ PROGRAMME DETAILS ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-surface">
        <Blob className="-left-24 bottom-0 h-80 w-80 blur-2xl" color="#eeeafe" opacity={0.9} />
        <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-4 !text-accent-violet-deep">Procurement</p>
            <h2 className="text-[28px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              Programme details
            </h2>

            <dl className="mt-10 overflow-hidden rounded-[24px] bg-paper">
              {[
                ['Department', DIVISION.department],
                ['Division', DIVISION.division],
                ['Programme', DIVISION.programme],
                ['Tender reference', DIVISION.tender],
                ['Academic session', DIVISION.session],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex flex-col gap-1 px-7 py-5 sm:flex-row sm:items-baseline sm:gap-8 ${
                    i % 2 === 1 ? 'bg-white/60' : ''
                  }`}
                >
                  <dt className="w-44 shrink-0 text-[12px] font-bold uppercase tracking-[0.08em] text-faint">
                    {k}
                  </dt>
                  <dd className="text-[15px] font-bold text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-[15px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Contact the division office
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
