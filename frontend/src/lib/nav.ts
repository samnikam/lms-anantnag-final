import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardList,
  FileBadge,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  LifeBuoy,
  ListChecks,
  Megaphone,
  Bell,
  ScrollText,
  SlidersHorizontal,
  UserCircle,
  Users,
  UserSquare2,
  Video,
} from 'lucide-react';
import type { Role } from './auth';

/**
 * Sidebar sections, in the order they appear — which is the order the portal
 * is actually used in. An admin sets up schools, then the year, then classes,
 * then subjects, then the people; only after that does a timetable or a
 * register mean anything. Grouping the screens by what they are rather than
 * by when they are needed left an admin guessing where to start.
 */
export const NAV_GROUPS = [
  'main',
  'setup',
  'teaching',
  'insights',
  'communication',
  'system',
  'account',
] as const;
export type NavGroup = (typeof NAV_GROUPS)[number];

export const GROUP_LABELS: Record<NavGroup, string | null> = {
  main: null, // Dashboard sits above the first heading
  setup: 'Set up · step by step',
  teaching: 'Teaching & learning',
  insights: 'Insights',
  communication: 'Communication',
  system: 'System',
  account: 'Account',
};

export interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  group: NavGroup;
  roles: Role[];
  /**
   * Per-role wording. Several screens are shared but scoped differently by the
   * server — a teacher's course list is their own assignments, an admin's is
   * the whole catalogue. The label should say which.
   */
  labelByRole?: Partial<Record<Role, string>>;
  /**
   * Per-role placement. Subjects are something an admin sets up before a
   * timetable can exist, but something a teacher simply teaches from.
   */
  groupByRole?: Partial<Record<Role, NavGroup>>;
}

const ALL: Role[] = [
  'SUPER_ADMIN',
  'ACADEMIC_ADMIN',
  'TEACHER',
  'STUDENT',
  'PARENT',
  'CONTENT_MANAGER',
  'DEPT_OVERSIGHT',
];

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, group: 'main', roles: ALL },

  // ── Learning ──────────────────────────────────────────────────────────
  {
    to: '/courses',
    label: 'Subjects',
    icon: BookOpen,
    group: 'teaching',
    groupByRole: { SUPER_ADMIN: 'setup', ACADEMIC_ADMIN: 'setup' },
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'CONTENT_MANAGER'],
    labelByRole: { TEACHER: 'My Subjects' },
  },
  {
    to: '/my-learning',
    label: 'My Learning',
    icon: GraduationCap,
    group: 'teaching',
    roles: ['STUDENT'],
  },
  {
    to: '/library',
    label: 'Content Library',
    icon: LibraryBig,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'CONTENT_MANAGER'],
  },
  {
    to: '/live',
    label: 'Live & Broadcast',
    icon: Video,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'STUDENT'],
    labelByRole: { TEACHER: 'My Live Classes', STUDENT: 'Join Live Class' },
  },
  {
    to: '/calendar',
    label: 'Timetable',
    icon: CalendarDays,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    labelByRole: { TEACHER: 'My Timetable', PARENT: "Child's Timetable" },
  },
  {
    to: '/attendance',
    label: 'Attendance',
    icon: ListChecks,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'STUDENT'],
    labelByRole: { TEACHER: 'Mark Attendance', STUDENT: 'My Attendance' },
  },
  {
    to: '/assignments',
    label: 'Assignments',
    icon: ClipboardList,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'STUDENT'],
    labelByRole: { TEACHER: 'Grading', STUDENT: 'My Assignments' },
  },
  {
    to: '/quizzes',
    label: 'Quizzes & Exams',
    icon: FileCheck2,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'STUDENT'],
    labelByRole: { TEACHER: 'Question Bank & Exams', STUDENT: 'My Quizzes' },
  },
  {
    to: '/certificates',
    label: 'Certificates',
    icon: FileBadge,
    group: 'teaching',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'STUDENT'],
    labelByRole: { STUDENT: 'My Certificates' },
  },

  // ── Administration ────────────────────────────────────────────────────
  {
    to: '/users',
    label: 'Teachers & Students',
    icon: Users,
    group: 'setup',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN'],
  },
  {
    to: '/classes',
    label: 'Classes',
    icon: GraduationCap,
    group: 'setup',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN'],
  },
  {
    to: '/academic',
    label: 'Academic Year',
    icon: UserSquare2,
    group: 'setup',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN'],
  },
  {
    to: '/sites',
    label: 'Schools & Devices',
    icon: Building2,
    group: 'setup',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'DEPT_OVERSIGHT'],
    labelByRole: { DEPT_OVERSIGHT: 'Site Monitoring' },
  },

  // ── Insights ──────────────────────────────────────────────────────────
  {
    to: '/reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    group: 'insights',
    roles: ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'DEPT_OVERSIGHT'],
    labelByRole: { TEACHER: 'Learner Progress', DEPT_OVERSIGHT: 'Utilization Reports' },
  },

  // ── Communication ─────────────────────────────────────────────────────
  { to: '/announcements', label: 'Announcements', icon: Megaphone, group: 'communication', roles: ALL },
  { to: '/notifications', label: 'Notifications', icon: Bell, group: 'communication', roles: ALL },
  { to: '/support', label: 'Help & Support', icon: LifeBuoy, group: 'communication', roles: ALL },
  { to: '/profile', label: 'My Profile', icon: UserCircle, group: 'account', roles: ALL },

  // ── System (Super Admin only) ─────────────────────────────────────────
  {
    to: '/settings',
    label: 'System Settings',
    icon: SlidersHorizontal,
    group: 'system',
    roles: ['SUPER_ADMIN'],
  },
  { to: '/audit', label: 'Audit Logs', icon: ScrollText, group: 'system', roles: ['SUPER_ADMIN'] },
];

export function navFor(role: Role): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role)).map((item) => ({
    ...item,
    label: item.labelByRole?.[role] ?? item.label,
    group: item.groupByRole?.[role] ?? item.group,
  }));
}

/**
 * Within "Set up", order by what has to exist first: a school, then the year
 * it runs, then its classes, then what those classes study, then the people.
 */
const SETUP_ORDER = ['/sites', '/academic', '/classes', '/courses', '/users'];

function order(group: NavGroup, items: NavItem[]): NavItem[] {
  if (group !== 'setup') return items;
  return [...items].sort((a, b) => SETUP_ORDER.indexOf(a.to) - SETUP_ORDER.indexOf(b.to));
}

/** Groups the role's items in section order, dropping sections it cannot see. */
export function navSectionsFor(role: Role): Array<{ group: NavGroup; label: string | null; items: NavItem[] }> {
  const items = navFor(role);
  return NAV_GROUPS.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    items: order(group, items.filter((i) => i.group === group)),
  })).filter((section) => section.items.length > 0);
}
