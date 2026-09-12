import {
  Accessibility,
  Award,
  BookOpen,
  Brain,
  CalendarDays,
  Gavel,
  HandHeart,
  Handshake,
  Heart,
  Laptop,
  LifeBuoy,
  MapPin,
  MonitorPlay,
  School,
  ScrollText,
  Sparkles,
  Users,
  Volleyball,
} from 'lucide-react';

/**
 * The written content of the About page, kept out of the markup so it can be
 * edited without touching layout.
 *
 * TO FILL IN: three rows of AT_A_GLANCE are marked `pending` because the
 * division has not supplied them. Nothing here invents a date or a headcount.
 */

export const VISION =
  'To provide inclusive, accessible and quality education that enables every student to develop knowledge, confidence, character and skills for the future.';

/* ── Mission ───────────────────────────────────────────────────────────── */

export const MISSION = [
  { icon: BookOpen, text: 'Promote quality teaching and learning' },
  { icon: Brain, text: 'Encourage curiosity and creativity' },
  { icon: LifeBuoy, text: 'Support every learner' },
  { icon: Gavel, text: 'Develop discipline and responsibility' },
  { icon: Laptop, text: 'Encourage digital literacy' },
  { icon: Volleyball, text: 'Promote sports and co-curricular activities' },
  { icon: Handshake, text: 'Build strong school–community relationships' },
] as const;

/* ── Values ────────────────────────────────────────────────────────────── */

export const VALUES = [
  { icon: ScrollText, name: 'Integrity', tone: 'coral' },
  { icon: Handshake, name: 'Respect', tone: 'violet' },
  { icon: Gavel, name: 'Responsibility', tone: 'sky' },
  { icon: Accessibility, name: 'Inclusiveness', tone: 'mint' },
  { icon: Award, name: 'Discipline', tone: 'amber' },
  { icon: Sparkles, name: 'Excellence', tone: 'coral' },
  { icon: Heart, name: 'Compassion', tone: 'violet' },
] as const;

/* ── Head of institution ───────────────────────────────────────────────── */

export const HEAD_MESSAGE =
  'Education is not only about academic achievement; it is about developing responsible, confident and capable individuals. We strive to provide every student with opportunities to learn, participate and grow.';

/** Replace with the actual office holder before publishing. */
export const HEAD_OF_INSTITUTION = {
  name: 'To be confirmed',
  role: 'Head of Institution',
};

/* ── Teaching staff ────────────────────────────────────────────────────── */

/**
 * Deliberately impersonal. Individual names, photographs and contact details
 * are not published here; a school supplies them to its own families.
 */
export const STAFF_NOTE =
  'Our schools are staffed by dedicated educators supporting academic and personal development. Specialist teaching is shared across the district, so a class can study a subject its own school could not staff alone.';

export const STAFF_POINTS = [
  {
    icon: Users,
    title: 'Class teachers',
    body: 'A named teacher answerable for each class — its register, its wellbeing and its day-to-day running.',
  },
  {
    icon: BookOpen,
    title: 'Subject teachers',
    body: 'A teacher assigned to each subject a class studies, responsible for what is taught and how it is assessed.',
  },
  {
    icon: MonitorPlay,
    title: 'Studio teaching',
    body: 'Specialists who teach from the broadcast studios, reaching classrooms across the district in the same period.',
  },
  {
    icon: HandHeart,
    title: 'Support staff',
    body: 'Office and facilitation staff who keep the classrooms, the equipment and the records running.',
  },
] as const;

/* ── School at a glance ────────────────────────────────────────────────── */

export interface GlanceRow {
  icon: typeof School;
  label: string;
  value: string;
  /** True where the division has yet to supply the figure. */
  pending?: boolean;
}

export const AT_A_GLANCE: GlanceRow[] = [
  { icon: CalendarDays, label: 'Established', value: 'To be confirmed', pending: true },
  { icon: MapPin, label: 'Location', value: 'Anantnag District, Jammu & Kashmir' },
  { icon: BookOpen, label: 'Classes', value: 'As offered at each participating school' },
  { icon: Users, label: 'Students', value: 'To be confirmed', pending: true },
  { icon: School, label: 'Teachers', value: 'To be confirmed', pending: true },
  { icon: MapPin, label: 'Campus', value: '21 school sites across the district' },
  {
    icon: MonitorPlay,
    label: 'Facilities',
    value: '42 smart classrooms, 2 broadcast studios',
  },
];
