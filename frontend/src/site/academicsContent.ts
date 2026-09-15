import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  Laptop,
  LifeBuoy,
  MonitorPlay,
  PencilRuler,
  Presentation,
  ScrollText,
  Sparkles,
  Users,
} from 'lucide-react';

/**
 * The written content of the Academics page.
 *
 * TO FILL IN: the CALENDAR documents have no files behind them yet. Each
 * carries `pending`, and the page says so plainly rather than offering a
 * download that would fail.
 */

/* ── Academic structure ────────────────────────────────────────────────── */

/**
 * Stages rather than a fixed class list: the schools in the programme do not
 * all offer the same range, so naming a single one would be wrong for most.
 */
export const STAGES = [
  {
    stage: 'Primary',
    grades: 'Classes 1–5',
    tone: 'coral',
    body: 'Foundations in literacy and numeracy, and the habits that make later study possible.',
  },
  {
    stage: 'Middle',
    grades: 'Classes 6–8',
    tone: 'violet',
    body: 'Conceptual learning across subjects, with room to explore where interest leads.',
  },
  {
    stage: 'Secondary',
    grades: 'Classes 9–10',
    tone: 'mint',
    body: 'Subject-focused study, board examination preparation and early career awareness.',
  },
  {
    stage: 'Higher Secondary',
    grades: 'Classes 11–12',
    tone: 'amber',
    body: 'Stream-based study for students continuing beyond the secondary stage, where offered.',
  },
] as const;

export const STRUCTURE_NOTE =
  'The stages offered vary between schools in the programme. Your own school office can confirm which classes it runs this session.';

/* ── Curriculum ────────────────────────────────────────────────────────── */

export const CURRICULUM_STATEMENT =
  'The school follows the prescribed curriculum and academic framework applicable to government schools in Jammu & Kashmir.';

export const SUBJECT_STREAMS = [
  {
    title: 'Core subjects',
    tone: 'coral',
    subjects: ['Mathematics', 'Science', 'Social Science'],
  },
  {
    title: 'Languages',
    tone: 'violet',
    subjects: ['English', 'Urdu', 'Kashmiri', 'Hindi', 'Arabic', 'Persian'],
  },
  {
    title: 'Skills & wellbeing',
    tone: 'mint',
    subjects: ['Computer Science', 'Art Education', 'Health & Physical Education'],
  },
] as const;

/* ── Teaching & learning ───────────────────────────────────────────────── */

export const TEACHING = [
  {
    icon: Presentation,
    tone: 'coral',
    title: 'Classroom teaching',
    body: 'The teacher in the room remains the centre of the school day.',
  },
  {
    icon: Sparkles,
    tone: 'violet',
    title: 'Activity-based learning',
    body: 'Learning by doing, rather than only by listening and copying.',
  },
  {
    icon: Laptop,
    tone: 'sky',
    title: 'Digital learning',
    body: 'Resources, recordings and exercises reached through the portal.',
  },
  {
    icon: MonitorPlay,
    tone: 'mint',
    title: 'Interactive lessons',
    body: 'Lessons taught on the classroom panel, with the class taking part.',
  },
  {
    icon: FlaskConical,
    tone: 'amber',
    title: 'Practical learning',
    body: 'Experiments, demonstrations and work that has to be carried out.',
  },
  {
    icon: ClipboardCheck,
    tone: 'coral',
    title: 'Assessments',
    body: 'Regular checks on understanding, not only end-of-term papers.',
  },
  {
    icon: LifeBuoy,
    tone: 'violet',
    title: 'Remedial support',
    body: 'Extra help for learners who need more time on a topic.',
  },
] as const;

/* ── Digital learning ──────────────────────────────────────────────────── */

export const DIGITAL_STATEMENT =
  'Students can access digital learning resources, live sessions, recorded lessons, assignments and other educational materials through the school’s learning platform.';

export const DIGITAL_ITEMS = [
  { icon: BookOpen, label: 'Courses & lessons' },
  { icon: ScrollText, label: 'Digital resources' },
  { icon: MonitorPlay, label: 'Live classes' },
  { icon: ClipboardList, label: 'Assignments' },
  { icon: ClipboardCheck, label: 'Assessments' },
  { icon: GraduationCap, label: 'Progress tracking' },
] as const;

/* ── Assessment ────────────────────────────────────────────────────────── */

export const ASSESSMENT = [
  {
    icon: CalendarDays,
    title: 'Periodic assessments',
    body: 'Checks through the year, so difficulty is found early rather than at the end.',
  },
  {
    icon: PencilRuler,
    title: 'Class tests',
    body: 'Short tests set by the subject teacher against what has just been taught.',
  },
  {
    icon: ClipboardList,
    title: 'Assignments',
    body: 'Work set against a class, submitted in the portal and graded where it was set.',
  },
  {
    icon: ScrollText,
    title: 'Examinations',
    body: 'Formal papers drawn from a question bank, with results published and kept.',
  },
  {
    icon: Users,
    title: 'Student progress monitoring',
    body: 'Attendance, completion and results followed together, and visible to guardians.',
  },
] as const;
