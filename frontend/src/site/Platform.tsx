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
import { IconTile, type Accent } from '../components/ui';
import { Section, SectionHeading } from './PublicLayout';

/**
 * The portal's modules, grouped the way the signed-in sidebar groups them so
 * the public page and the product describe the same thing.
 */
const GROUPS: Array<{
  group: string;
  blurb: string;
  items: Array<{ icon: typeof Video; accent: Accent; title: string; body: string }>;
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
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow mb-4 !text-brand-500">The platform</p>
          <h1 className="max-w-3xl text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[42px]">
            Every part of the school day, kept in one record
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
            The portal is organised the way a school year is actually built: the office sets up
            schools, classes and subjects first, and the timetable, registers and results follow
            from them.
          </p>
        </div>
      </section>

      {GROUPS.map((g, i) => (
        <Section key={g.group} className={i % 2 === 1 ? 'bg-surface' : undefined}>
          <SectionHeading eyebrow={`0${i + 1}`} title={g.group} description={g.blurb} align="left" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.items.map((it) => (
              <article
                key={it.title}
                className={i % 2 === 1 ? 'rounded-[20px] bg-paper p-6' : 'card p-6'}
              >
                <IconTile icon={it.icon} accent={it.accent} />
                <h3 className="mt-5 text-[15.5px] font-bold tracking-[-0.01em] text-ink">
                  {it.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{it.body}</p>
              </article>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeading
          eyebrow="Assurance"
          title="Built to be answerable"
          description="A school record is only worth keeping if it can be trusted and, when necessary, questioned."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {ASSURANCES.map(([title, body]) => (
            <div key={title} className="flex gap-4 rounded-[18px] bg-surface p-6">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-mint" aria-hidden />
              <div>
                <h3 className="text-[14.5px] font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section width="narrow" className="bg-surface text-center">
        <IconTile icon={LifeBuoy} accent="brand" className="mx-auto" />
        <h2 className="mt-6 text-[24px] font-extrabold tracking-[-0.025em] text-ink sm:text-[28px]">
          Ready to sign in?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
          Accounts are issued by your school or the division office. Support is available in the
          portal once you are signed in.
        </p>
        <Link to="/login" className="btn-primary mt-8 !rounded-full !px-7 !py-3 !text-[14px]">
          <LogIn className="h-4 w-4" aria-hidden />
          Sign in
        </Link>
      </Section>
    </>
  );
}
