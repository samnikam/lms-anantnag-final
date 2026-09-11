import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import { IconTile, type Accent } from '../components/ui';
import { DIVISION, FIGURES, Section, SectionHeading } from './PublicLayout';

const PROBLEM = [
  {
    title: 'A subject teacher cannot be at every school',
    body: 'Specialist teachers are scarce and spread thin across a division. A class without one simply goes without that subject.',
  },
  {
    title: 'Records lived in separate registers',
    body: 'Attendance in one book, marks in another, the timetable on a noticeboard — with no way to see a learner whole, or a school at a glance.',
  },
  {
    title: 'Material was rebuilt at every school',
    body: 'The same lesson prepared many times over, to an uneven standard, with no shared library to draw on.',
  },
];

const APPROACH: Array<{ icon: typeof Radio; accent: Accent; title: string; body: string }> = [
  {
    icon: Radio,
    accent: 'coral',
    title: 'Teach once, receive everywhere',
    body: 'Two studios broadcast to interactive panels installed in classrooms across the division, so one specialist teacher reaches many schools in the same period.',
  },
  {
    icon: Building2,
    accent: 'violet',
    title: 'One record for the division',
    body: 'Timetable, attendance, assignments, results and certificates are kept in a single system, scoped so each school sees its own and the office sees all of them.',
  },
  {
    icon: ShieldCheck,
    accent: 'mint',
    title: 'Access decided on the server',
    body: 'Every request is checked against the signed-in role and the school it belongs to. Hiding a link is not treated as security.',
  },
  {
    icon: Sparkles,
    accent: 'amber',
    title: 'Built for uneven connectivity',
    body: 'Sessions are recorded for later viewing, and classroom panels sign in as shared devices rather than requiring each learner to hold an account.',
  },
];

export function AboutPage() {
  return (
    <>
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow mb-4 !text-brand-500">About the programme</p>
          <h1 className="max-w-3xl text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[42px]">
            Bringing a full curriculum within reach of every school in the division
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
            The {DIVISION.programme} is an initiative of the {DIVISION.department},{' '}
            {DIVISION.division}. It pairs classroom hardware with a single portal so that a
            lesson taught in one place can be received, recorded and accounted for everywhere.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FIGURES.map((f) => (
              <div key={f.label} className="card p-5">
                <dd className="num text-[26px] font-extrabold leading-none text-ink">{f.value}</dd>
                <dt className="label mt-2">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="What the division set out to solve"
          align="left"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEM.map((p) => (
            <article key={p.title} className="rounded-[20px] border-l-[3px] border-accent-coral bg-surface p-6">
              <h3 className="text-[15.5px] font-bold tracking-[-0.01em] text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading eyebrow="The approach" title="How the portal answers it" align="left" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {APPROACH.map((a) => (
            <article key={a.title} className="flex gap-5 rounded-[20px] bg-paper p-6">
              <IconTile icon={a.icon} accent={a.accent} />
              <div className="min-w-0">
                <h3 className="text-[15.5px] font-bold tracking-[-0.01em] text-ink">{a.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{a.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section width="narrow">
        <div className="card p-8 sm:p-10">
          <p className="eyebrow mb-3 !text-brand-500">Procurement</p>
          <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-ink">
            Programme details
          </h2>
          <dl className="mt-7 space-y-4 text-[14px]">
            {[
              ['Department', DIVISION.department],
              ['Division', DIVISION.division],
              ['Programme', DIVISION.programme],
              ['Tender reference', DIVISION.tender],
              ['Academic session', DIVISION.session],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 border-b border-rule pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="label w-44 shrink-0">{k}</dt>
                <dd className="font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-bold text-brand-600 transition-colors hover:text-brand-700"
          >
            Contact the division office
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}
