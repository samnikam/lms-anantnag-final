import { Link } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileBadge,
  FileCheck2,
  LibraryBig,
  LifeBuoy,
  ListChecks,
  LogIn,
  Megaphone,
  MonitorPlay,
  Users,
  Video,
} from 'lucide-react';
import { Section } from './PublicLayout';
import { Marker, Reveal } from './motion';
import { Blob, Doodle, WaveDivider } from './illustrations';

type Tone = 'coral' | 'mint' | 'sky' | 'amber' | 'violet' | 'brand';

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
  brand: { soft: 'bg-tint-brand', solid: 'bg-brand-600', text: 'text-brand-600' },
} as const;


/**
 * The portal's modules, grouped the way the signed-in sidebar groups them so
 * the public page and the product describe the same thing.
 */
const GROUPS: Array<{
  group: string;
  blurb: string;
  items: Array<{ icon: typeof Video; accent: Tone; title: string; body: string }>;
}> = [
  {
    group: 'Teaching & learning',
    blurb: 'The school day itself — what is taught, when, and to whom.',
    items: [
      {
        icon: Video,
        accent: 'coral',
        title: 'Live & broadcast',
        body: 'Studio sessions broadcast to classroom panels, joined from the portal and recorded for anyone who missed them.',
      },
      {
        icon: CalendarDays,
        accent: 'violet',
        title: 'Timetable',
        body: 'Authored by the academic office. Each period names its class, subject and teacher, and clashes are reported rather than silently allowed.',
      },
      {
        icon: BookOpen,
        accent: 'sky',
        title: 'Subjects',
        body: 'Each class studies a set of subjects, and each subject has a teacher answerable for it at that class.',
      },
      {
        icon: LibraryBig,
        accent: 'amber',
        title: 'Content library',
        body: 'Lesson material prepared, reviewed and published centrally, then reused by every school rather than rebuilt.',
      },
    ],
  },
  {
    group: 'Records',
    blurb: 'What the school has to be able to produce and stand behind.',
    items: [
      {
        icon: ListChecks,
        accent: 'mint',
        title: 'Attendance',
        body: 'A daily class register taken by the class teacher, with corrections kept as an auditable trail and guardians alerted below 75%.',
      },
      {
        icon: ClipboardList,
        accent: 'sky',
        title: 'Assignments',
        body: 'Set against a class, submitted in the portal, graded in place, with late work marked as late.',
      },
      {
        icon: FileCheck2,
        accent: 'violet',
        title: 'Quizzes & exams',
        body: 'A question bank behind proctored attempts, marked automatically where the format allows.',
      },
      {
        icon: FileBadge,
        accent: 'amber',
        title: 'Certificates',
        body: 'Issued on completion and publicly verifiable by code, so a claim can be checked without an account.',
      },
    ],
  },
  {
    group: 'Administration',
    blurb: 'The people, the places and the oversight around them.',
    items: [
      {
        icon: Users,
        accent: 'brand',
        title: 'People & classes',
        body: 'Teachers, learners and guardians, the classes they belong to, and the class teacher answerable for each.',
      },
      {
        icon: MonitorPlay,
        accent: 'coral',
        title: 'Schools & devices',
        body: 'Sites, classrooms and interactive panels, with a heartbeat showing which are online and which need attention.',
      },
      {
        icon: BarChart3,
        accent: 'mint',
        title: 'Reports & analytics',
        body: 'Progress, attendance and utilisation rolled up by class and by school for the division office.',
      },
      {
        icon: Megaphone,
        accent: 'sky',
        title: 'Announcements & support',
        body: 'Notices addressed to a school, a class or everyone, and a ticket queue when something needs fixing.',
      },
    ],
  },
];

const ASSURANCES = [
  ['Role-based access', 'Seven roles, each scoped on the server to its own school, classes and learners.'],
  ['Audit trail', 'Privileged actions are recorded with who did what, to which record, and when.'],
  ['Attendance corrections', 'A mark can be corrected, but only with a reason, and the original is kept.'],
  ['Shared classroom panels', 'Panels sign in as devices in a kiosk mode, not as a person, so no learner account is left open on a shared screen.'],
];

export function PlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f2f9ff] via-paper to-paper">
        <Blob className="-left-32 -top-24 h-[28rem] w-[28rem] blur-2xl" color="#e4f3fd" opacity={0.95} />
        <Blob className="-right-28 top-32 h-80 w-80 blur-2xl" color="#fdf1dd" opacity={0.9} />
        <Doodle kind="plus" className="anim-wiggle absolute right-[12%] top-[22%] h-8 w-8" color="#56b8e8" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-5 !text-accent-sky-deep">The platform</p>
            <h1 className="max-w-4xl text-[38px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[54px] lg:text-[62px]">
              Every part of the school day, in{' '}
              <Marker color="#ffd27a">
                <span>one record</span>
              </Marker>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              The portal is organised the way a school year is actually built: the office sets up
              schools, classes and subjects first, and the timetable, registers and results follow
              from them.
            </p>
          </Reveal>
        </div>
      </section>

      {GROUPS.map((g, i) => (
        <Section key={g.group} className={i % 2 === 1 ? 'bg-surface' : undefined}>
          <Reveal>
            <span className="num inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-brand-700 text-[15px] font-extrabold text-white shadow-pill">
              {`0${i + 1}`}
            </span>
            <h2 className="mt-5 text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[40px]">
              {g.group}
            </h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted">{g.blurb}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.items.map((it, j) => {
              const t = TONE[it.accent];
              return (
                <Reveal key={it.title} delay={(j % 4) * 90}>
                  <article className={`block-card ${t.soft} h-full`}>
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-[16px] ${t.solid} text-white shadow-sm`}
                    >
                      <it.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                      {it.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">{it.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ))}

      <section className="relative overflow-hidden bg-brand-800">
        <Doodle kind="ring" className="anim-float absolute left-[5%] top-[16%] h-14 w-14 opacity-25" color="#3bc9a0" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-white/50">
              Assurance
            </p>
            <h2 className="mt-5 max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[44px]">
              Built to be answerable
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65">
              A school record is only worth keeping if it can be trusted and, when necessary,
              questioned.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {ASSURANCES.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 100}>
                <div className="block-card h-full bg-white/[0.06] ring-1 ring-white/10">
                  <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-white">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/65">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <WaveDivider className="block h-16 w-full sm:h-24" fill="#ffffff" />
      </section>

      <Section width="narrow" className="bg-surface !pt-4 text-center">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-brand-700 text-white shadow-pill">
          <LifeBuoy className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-7 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
          Ready to sign in?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-muted">
          Accounts are issued by your school or the division office. Support is available in the
          portal once you are signed in.
        </p>
        <Link
          to="/login"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-700 px-8 py-4 text-[15px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
        >
          <LogIn className="h-4 w-4" aria-hidden />
          Sign in
        </Link>
      </Section>
    </>
  );
}
