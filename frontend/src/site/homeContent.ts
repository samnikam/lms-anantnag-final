import {
  Accessibility,
  Coins,
  Compass,
  Cpu,
  FlaskConical,
  GraduationCap,
  HandHeart,
  Landmark,
  Laptop,
  Leaf,
  LibraryBig,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  UtensilsCrossed,
  Volleyball,
} from 'lucide-react';

/**
 * The written content of the front page, kept out of the markup so it can be
 * edited without touching layout — and so what still needs the division's own
 * words is easy to find.
 *
 * TO FILL IN: `HEAD_OF_INSTITUTION.name` and `.role` are placeholders.
 * Nothing here invents a person, a prize or a statistic.
 */

/* ── Quick information, immediately under the hero ─────────────────────── */

export const QUICK_INFO = [
  {
    icon: GraduationCap,
    tone: 'coral',
    title: 'Quality Education',
    body: 'Accessible, inclusive teaching for every learner in the district.',
  },
  {
    icon: Laptop,
    tone: 'violet',
    title: 'Digital Learning',
    body: 'Technology-enabled classrooms and modern learning resources.',
  },
  {
    icon: Trophy,
    tone: 'mint',
    title: 'Holistic Development',
    body: 'Academic, sporting, cultural and co-curricular growth together.',
  },
  {
    icon: HandHeart,
    tone: 'amber',
    title: 'Community Focused',
    body: 'Working alongside parents and the local community.',
  },
] as const;

/* ── The head of institution's message ─────────────────────────────────── */

export const HEAD_MESSAGE =
  'Education is not only about academic achievement; it is about developing responsible, confident and capable individuals. We strive to provide every student with opportunities to learn, participate and grow.';

/** Replace both fields with the actual office holder before publishing. */
export const HEAD_OF_INSTITUTION = {
  name: 'To be confirmed',
  role: 'Head of Institution',
};

/* ── Why families choose these schools ─────────────────────────────────── */

export const WHY_US = [
  {
    icon: Accessibility,
    title: 'Inclusive Education',
    body: 'Equal learning opportunities for students from every background in the district.',
  },
  {
    icon: Users,
    title: 'Experienced Educators',
    body: 'Dedicated teachers focused on student learning and development.',
  },
  {
    icon: MonitorPlay,
    title: 'Digital Learning',
    body: 'Technology-supported teaching, in the classroom and beyond it.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Learning Environment',
    body: 'A supportive setting where students can learn with confidence.',
  },
  {
    icon: Coins,
    title: 'Affordable & Accessible',
    body: 'Quality government education, open to the whole local community.',
  },
  {
    icon: Sparkles,
    title: 'Holistic Development',
    body: 'Academics, sport, creativity, values and life skills together.',
  },
] as const;

/* ── Facilities, at a glance ───────────────────────────────────────────── */

export const FACILITY_CARDS = [
  { icon: MonitorPlay, tone: 'coral', title: 'Smart Classrooms', body: 'Interactive panels carrying live and recorded lessons.' },
  { icon: LibraryBig, tone: 'violet', title: 'Library', body: 'Reading material and a digital resource collection.' },
  { icon: Cpu, tone: 'sky', title: 'Computer & Digital Lab', body: 'Hands-on computing and digital skills practice.' },
  { icon: FlaskConical, tone: 'mint', title: 'Science Laboratory', body: 'Practical work supporting the science curriculum.' },
  { icon: Volleyball, tone: 'amber', title: 'Playground & Sports', body: 'Space for games, athletics and physical education.' },
  { icon: Leaf, tone: 'mint', title: 'Safe & Green Campus', body: 'A secure, well-kept environment for learning.' },
] as const;

/* ── Government initiatives ────────────────────────────────────────────── */

/**
 * National and UT programmes a government school in the district may come
 * under. Confirm which apply before publishing, and remove the rest.
 */
export const INITIATIVES = [
  {
    icon: Landmark,
    title: 'Samagra Shiksha',
    body: 'The integrated national scheme for school education, from pre-primary to Class 12.',
    href: 'https://samagrashiksha.jk.gov.in',
  },
  {
    icon: UtensilsCrossed,
    title: 'PM POSHAN',
    body: 'The national mid-day meal scheme supporting nutrition and attendance.',
    href: 'https://dsel.education.gov.in/pm-poshan',
  },
  {
    icon: Laptop,
    title: 'Digital Education',
    body: 'Smart classrooms, digital content and hybrid teaching across the district.',
  },
  {
    icon: Coins,
    title: 'Scholarship & Student Support',
    body: 'Central and UT scholarships available to eligible students.',
    href: 'https://scholarships.gov.in',
  },
  {
    icon: Accessibility,
    title: 'Inclusive Education',
    body: 'Support so that learners of all abilities and backgrounds can participate.',
  },
  {
    icon: Compass,
    title: 'Skill & Career Development',
    body: 'Vocational exposure and career awareness alongside the curriculum.',
  },
] as const;

