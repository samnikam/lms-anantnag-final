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
import { DISTRICT, type Photo } from './media';

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * The written content of the Facilities page.
 *
 * A caution the division asked for, and which this file enforces: nothing
 * here should claim a facility a school does not have. Anything that varies
 * between the schools in the programme carries `varies`, and the page says
 * so beside it rather than stating it as fact.
 */

export interface Facility extends Photo {
  icon: typeof MonitorPlay;
  tone: 'coral' | 'mint' | 'sky' | 'amber' | 'violet';
  title: string;
  body: string;
  /** Counted across the programme, where a count is meaningful. */
  count?: string;
  /** True where availability differs from school to school. */
  varies?: boolean;
}

export const FACILITY_BLOCKS: Facility[] = [
  {
    icon: MonitorPlay,
    tone: 'coral',
    title: 'Smart & digital classrooms',
    count: '42',
    body: 'Interactive learning environments supporting multimedia lessons and digital educational resources. Each panel receives studio broadcasts and serves as the board the teacher writes on.',
    src: unsplash('photo-1571260899304-425eee4c7efc'),
    alt: 'A classroom with a large interactive display at the front',
  },
  {
    icon: LibraryBig,
    tone: 'violet',
    title: 'Library',
    body: 'A learning space where students can read, explore and develop independent learning habits, supported by the programme’s shared digital collection.',
    src: unsplash('photo-1588072432836-e10032774350'),
    alt: 'A reading space lined with books',
    varies: true,
  },
  {
    icon: Cpu,
    tone: 'sky',
    title: 'Computer & digital learning',
    count: '42',
    body: 'Access to computers and digital resources to develop technology skills and support academic learning. An OPS computer sits behind every classroom panel.',
    src: unsplash('photo-1516321318423-f06f85e504b3'),
    alt: 'Students working at computers',
  },
  {
    icon: FlaskConical,
    tone: 'mint',
    title: 'Science laboratory',
    body: 'Practical work supporting the science curriculum — experiments, demonstrations and the habits of careful observation.',
    src: unsplash('photo-1523240795612-9a054b0db644'),
    alt: 'A practical science session in progress',
    varies: true,
  },
  {
    icon: Volleyball,
    tone: 'amber',
    title: 'Sports facilities',
    body: 'Encouraging physical fitness, teamwork, discipline and sportsmanship, through games, athletics and physical education.',
    src: unsplash('photo-1522202176988-66273c2fd55f'),
    alt: 'Students taking part in a group activity outdoors',
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
