import {
  Armchair,
  Building2,
  Cpu,
  Droplets,
  FlaskConical,
  Leaf,
  LibraryBig,
  MonitorPlay,
  ShieldCheck,
  Trees,
  Volleyball,
} from 'lucide-react';
import { ABOUT, DISTRICT, SCHOOL, type Photo } from './media';

/**
 * The written content of the Facilities page.
 *
 * A caution the division asked for, and which this file enforces: nothing
 * here should claim a facility a school does not have. Anything that varies
 * between the schools in the programme carries `varies`, and the page says
 * so beside it rather than stating it as fact.
 */

export interface Facility extends Partial<Photo> {
  icon: typeof MonitorPlay;
  tone: 'coral' | 'mint' | 'sky' | 'amber' | 'violet';
  title: string;
  body: string;
  /** Counted across the programme, where a count is meaningful. */
  count?: string;
  /** True where availability differs from school to school. */
  varies?: boolean;
  /** A photograph is optional: a block without one shows its icon instead. */
}

export const FACILITY_BLOCKS: Facility[] = [
  {
    icon: MonitorPlay,
    tone: 'coral',
    title: 'Smart & digital classrooms',
    count: '42',
    body: 'Interactive learning environments supporting multimedia lessons and digital educational resources. Each panel receives studio broadcasts and serves as the board the teacher writes on.',
    ...ABOUT.projectorLesson,
  },
  {
    icon: LibraryBig,
    tone: 'violet',
    title: 'Library',
    body: 'A learning space where students can read, explore and develop independent learning habits, supported by the programme’s shared digital collection.',
    ...ABOUT.library,
    varies: true,
  },
  {
    icon: Cpu,
    tone: 'sky',
    title: 'Computer & digital learning',
    count: '42',
    body: 'Access to computers and digital resources to develop technology skills and support academic learning. An OPS computer sits behind every classroom panel.',
    ...ABOUT.computerClass,
  },
  {
    icon: FlaskConical,
    tone: 'mint',
    title: 'Science laboratory',
    body: 'Practical work supporting the science curriculum — experiments, demonstrations and the habits of careful observation.',
    ...SCHOOL.scienceLab,
    varies: true,
  },
  {
    icon: Volleyball,
    tone: 'amber',
    title: 'Sports facilities',
    body: 'Encouraging physical fitness, teamwork, discipline and sportsmanship, through games, athletics and physical education.',
    ...SCHOOL.playground,
    varies: true,
  },
];

/* ── Campus ────────────────────────────────────────────────────────────── */

export interface CampusItem {
  icon: typeof Building2;
  label: string;
  /** True where provision differs between schools in the programme. */
  varies?: boolean;
}

export const CAMPUS: CampusItem[] = [
  { icon: Armchair, label: 'Classrooms' },
  { icon: Building2, label: 'School building' },
  { icon: Volleyball, label: 'Playground', varies: true },
  { icon: Trees, label: 'Garden & green spaces', varies: true },
  { icon: Droplets, label: 'Drinking water', varies: true },
  { icon: ShieldCheck, label: 'Sanitation', varies: true },
  { icon: Leaf, label: 'Safe, well-kept grounds', varies: true },
];

export const CAMPUS_NOTE =
  'Provision differs between the schools in the programme. Items marked "varies by school" are present at some sites and not others — your own school office can confirm what is available there. Nothing on this page is claimed for a school that does not have it.';

/** A photograph of the district, used behind the campus section. */
export const CAMPUS_PHOTO = DISTRICT.polytechnic;
