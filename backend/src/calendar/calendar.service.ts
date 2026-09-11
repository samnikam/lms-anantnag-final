import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { assertSiteAllowed, scopeSiteId } from '../common/site-scope';

export interface CalendarFilter {
  from?: Date;
  to?: Date;
  siteId?: string;
  studentId?: string;
  courseId?: string;
  classId?: string;
  batchId?: string;
  type?: string;
}

/**
 * Timetable access, by role:
 *
 *   Super Admin     every timetable, full edit
 *   Academic Admin  the official timetable for their assigned site, full edit
 *   Teacher         their own teaching timetable, read-only
 *   Student         their batch and enrolled-course timetable, read-only
 *   Parent          their linked child's timetable, read-only
 *
 * The narrowing happens here rather than in the UI, so a hand-rolled request
 * cannot read another site's or another child's schedule.
 */
@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  /** Roles allowed to author the timetable at all. */
  static canManage(role: Role): boolean {
    return role === Role.SUPER_ADMIN || role === Role.ACADEMIC_ADMIN;
  }

  async list(user: AuthUser, filter: CalendarFilter) {
    const where: Prisma.CalendarEventWhereInput = {
      startAt: {
        gte: filter.from ?? new Date(Date.now() - 7 * 864e5),
        lte: filter.to ?? new Date(Date.now() + 90 * 864e5),
      },
      ...(filter.type ? { type: filter.type } : {}),
      ...(filter.courseId ? { courseId: filter.courseId } : {}),
      ...(filter.classId ? { classId: filter.classId } : {}),
      ...(filter.batchId ? { batchId: filter.batchId } : {}),
    };

    const scope = await this.scopeFor(user, filter);
    const events = await this.prisma.calendarEvent.findMany({
      where: { ...where, ...scope },
      orderBy: { startAt: 'asc' },
      take: 500,
    });

    // Names, so the timetable reads as a schedule rather than a list of ids.
    return this.decorate(events);
  }

  /** Builds the role-specific slice of the timetable. */
  private async scopeFor(user: AuthUser, filter: CalendarFilter): Promise<Prisma.CalendarEventWhereInput> {
    switch (user.role) {
      case Role.SUPER_ADMIN:
        return filter.siteId ? { siteId: filter.siteId } : {};

      case Role.ACADEMIC_ADMIN: {
        // Confined to the assigned site; division-wide admins see everything.
        const site = scopeSiteId(user);
        if (filter.siteId) assertSiteAllowed(user, filter.siteId);
        const chosen = filter.siteId ?? site;
        // Division-wide entries carry no site and belong on every calendar.
        return chosen ? { OR: [{ siteId: chosen }, { siteId: null }] } : {};
      }

      case Role.TEACHER: {
        // A subject is shared by every school, so scoping by subject alone put
        // another school's Mathematics period on this teacher's timetable. What
        // a teacher holds is a class at a school, and the school bounds it.
        const [taught, classSubjects, inCharge, hosted] = await Promise.all([
          this.prisma.courseTeacher.findMany({
            where: { teacherId: user.id },
            select: { courseId: true },
          }),
          this.prisma.classSubject.findMany({
            where: { teacherId: user.id },
            select: { courseId: true, classId: true },
          }),
          this.prisma.schoolClass.findMany({
            where: { classTeacherId: user.id },
            select: { id: true },
          }),
          this.prisma.liveSession.findMany({
            where: { hostId: user.id },
            select: { id: true },
          }),
        ]);

        const courseIds = [
          ...new Set([...taught.map((t) => t.courseId), ...classSubjects.map((c) => c.courseId)]),
        ];
        const classIds = [
          ...new Set([...classSubjects.map((c) => c.classId), ...inCharge.map((c) => c.id)]),
        ];

        const mine: Prisma.CalendarEventWhereInput = {
          OR: [
            // A class they teach or are in charge of is theirs outright.
            ...(classIds.length ? [{ classId: { in: classIds } }] : []),
            // A subject they teach, but only at their own school.
            ...(courseIds.length ? [{ courseId: { in: courseIds } }] : []),
            { sessionId: { in: hosted.map((h) => h.id) } },
            { createdById: user.id },
            // A holiday or a school-wide notice names no class and no subject.
            // It is addressed to the school, so it is on everyone's timetable.
            { AND: [{ classId: null }, { courseId: null }, { batchId: null }] },
          ],
        };

        // Bounded by their own school, plus anything published to every school.
        if (!user.siteId) return mine;
        return { AND: [mine, { OR: [{ siteId: user.siteId }, { siteId: null }] }] };
      }

      case Role.STUDENT:
        return this.learnerScope(user.id);

      case Role.PARENT: {
        // Only a linked, approved child — and by default all of them.
        const links = await this.prisma.parentStudentLink.findMany({
          where: { parentId: user.id, status: 'APPROVED' },
          select: { studentId: true },
        });
        const allowed = links.map((l) => l.studentId);

        if (filter.studentId && !allowed.includes(filter.studentId)) {
          throw new ForbiddenException('You are not authorised to view that learner.');
        }
        const children = filter.studentId ? [filter.studentId] : allowed;
        if (children.length === 0) return { id: '__none__' };

        const scopes = await Promise.all(children.map((id) => this.learnerScope(id)));
        return { OR: scopes };
      }

      default:
        // Oversight and content roles get the shared, non-personal entries only.
        return { courseId: null };
    }
  }

  /**
   * A learner's periods between two moments, decorated the same way the
   * timetable is — so the dashboard and the timetable can never disagree
   * about which lessons a learner has or who takes them.
   */
  async periodsForLearner(studentId: string, from: Date, to: Date) {
    const scope = await this.learnerScope(studentId);
    const events = await this.prisma.calendarEvent.findMany({
      where: { AND: [{ startAt: { gte: from, lt: to } }, scope] },
      orderBy: { startAt: 'asc' },
      take: 50,
    });
    return this.decorate(events);
  }

  /**
   * A learner's timetable: the class they are in, their sections, their
   * courses, and whatever is addressed to the whole school.
   *
   * Class membership is held by ClassEnrollment. Deriving it from the course
   * enrolment's batch instead missed every learner without a section — which,
   * since a section is optional, is most of them — and left them with a
   * timetable that showed holidays but not a single one of their own periods.
   */
  private async learnerScope(studentId: string): Promise<Prisma.CalendarEventWhereInput> {
    const [enrollments, classLinks] = await Promise.all([
      this.prisma.enrollment.findMany({
        where: { studentId, status: EnrollmentStatus.ACTIVE },
        select: { courseId: true, batchId: true, batch: { select: { classId: true } } },
      }),
      this.prisma.classEnrollment.findMany({
        where: { studentId, status: EnrollmentStatus.ACTIVE },
        select: { classId: true, batchId: true },
      }),
    ]);

    const courseIds = enrollments.map((e) => e.courseId);
    const batchIds = [
      ...new Set(
        [...enrollments.map((e) => e.batchId), ...classLinks.map((c) => c.batchId)].filter(
          (b): b is string => !!b,
        ),
      ),
    ];
    // An entry for the whole class reaches every section within it.
    const classIds = [
      ...new Set(
        [
          ...classLinks.map((c) => c.classId),
          ...enrollments.map((e) => e.batch?.classId),
        ].filter((c): c is string => !!c),
      ),
    ];

    return {
      OR: [
        ...(courseIds.length ? [{ courseId: { in: courseIds } }] : []),
        ...(batchIds.length ? [{ batchId: { in: batchIds } }] : []),
        ...(classIds.length ? [{ classId: { in: classIds } }] : []),
        // Holidays and division-wide notices belong to everyone.
        { AND: [{ courseId: null }, { batchId: null }, { classId: null }] },
      ],
    };
  }

  /** The person who takes a period, in the order the school would name them. */
  private static readonly TEACHER_SELECT = { id: true, fullName: true, email: true };

  private async decorate(events: any[]) {
    const courseIds = [...new Set(events.map((e) => e.courseId).filter(Boolean))];
    const batchIds = [...new Set(events.map((e) => e.batchId).filter(Boolean))];
    const classIds = [...new Set(events.map((e) => e.classId).filter(Boolean))];
    const siteIds = [...new Set(events.map((e) => e.siteId).filter(Boolean))];
    const sessionIds = [...new Set(events.map((e) => e.sessionId).filter(Boolean))];

    const sel = CalendarService.TEACHER_SELECT;
    const [courses, batches, classes, sites, classSubjects, courseTeachers, sessions] =
      await Promise.all([
        courseIds.length
          ? this.prisma.course.findMany({ where: { id: { in: courseIds } }, select: { id: true, title: true, code: true } })
          : [],
        batchIds.length
          ? this.prisma.batch.findMany({ where: { id: { in: batchIds } }, select: { id: true, name: true } })
          : [],
        classIds.length
          ? this.prisma.schoolClass.findMany({
              where: { id: { in: classIds } },
              select: { id: true, name: true, classTeacher: { select: sel } },
            })
          : [],
        siteIds.length
          ? this.prisma.site.findMany({ where: { id: { in: siteIds } }, select: { id: true, name: true } })
          : [],
        // Who teaches this subject to this class — the answer for a period
        // that names both.
        classIds.length && courseIds.length
          ? this.prisma.classSubject.findMany({
              where: { classId: { in: classIds }, courseId: { in: courseIds } },
              select: { classId: true, courseId: true, teacher: { select: sel } },
            })
          : [],
        // A subject-wide fallback for a period that names no class.
        courseIds.length
          ? this.prisma.courseTeacher.findMany({
              where: { courseId: { in: courseIds } },
              select: { courseId: true, isLead: true, teacher: { select: sel } },
              orderBy: { isLead: 'desc' },
            })
          : [],
        sessionIds.length
          ? this.prisma.liveSession.findMany({
              where: { id: { in: sessionIds } },
              select: { id: true, host: { select: sel } },
            })
          : [],
      ]);

    const byId = (rows: any[]) => Object.fromEntries(rows.map((r) => [r.id, r]));
    const c = byId(courses), b = byId(batches), k = byId(classes), s = byId(sites);

    const subjectTeacher = Object.fromEntries(
      classSubjects.filter((cs) => cs.teacher).map((cs) => [`${cs.classId}:${cs.courseId}`, cs.teacher]),
    );
    // First wins, and leads were ordered first.
    const leadTeacher: Record<string, any> = {};
    for (const ct of courseTeachers) {
      if (ct.teacher && !leadTeacher[ct.courseId]) leadTeacher[ct.courseId] = ct.teacher;
    }
    const sessionHost = Object.fromEntries(
      sessions.filter((x) => x.host).map((x) => [x.id, x.host]),
    );

    return events.map((e) => {
      const cls = e.classId ? k[e.classId] ?? null : null;
      /* Most specific first: the person who teaches this subject to this
         class, then whoever hosts the broadcast, then the subject lead, and
         failing all of those the teacher in charge of the class. */
      const teacher =
        (e.classId && e.courseId ? subjectTeacher[`${e.classId}:${e.courseId}`] : null) ??
        (e.sessionId ? sessionHost[e.sessionId] : null) ??
        (e.courseId ? leadTeacher[e.courseId] : null) ??
        cls?.classTeacher ??
        null;

      return {
        ...e,
        course: e.courseId ? c[e.courseId] ?? null : null,
        batch: e.batchId ? b[e.batchId] ?? null : null,
        schoolClass: cls ? { id: cls.id, name: cls.name } : null,
        site: e.siteId ? s[e.siteId] ?? null : null,
        teacher,
      };
    });
  }

  async create(user: AuthUser, data: any) {
    if (data.endAt <= data.startAt) {
      throw new ForbiddenException('The event must end after it starts.');
    }

    // A scoped admin authors the timetable for their own site, and only there.
    const scope = scopeSiteId(user);
    if (scope) {
      if (data.siteId && data.siteId !== scope) {
        throw new ForbiddenException('You can only schedule at your assigned site.');
      }
      data = { ...data, siteId: scope };
    }

    const clash = await this.findConflict(data);
    const event = await this.prisma.calendarEvent.create({
      data: { ...data, createdById: user.id },
    });
    return { ...event, conflict: clash };
  }

  async update(user: AuthUser, id: string, data: any) {
    const existing = await this.prisma.calendarEvent.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Timetable entry not found.');
    assertSiteAllowed(user, existing.siteId);
    if (data.siteId) assertSiteAllowed(user, data.siteId);

    return this.prisma.calendarEvent.update({ where: { id }, data });
  }

  async remove(user: AuthUser, id: string) {
    const existing = await this.prisma.calendarEvent.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Timetable entry not found.');
    assertSiteAllowed(user, existing.siteId);

    // A session-backed entry is the session's mirror; removing it alone would
    // leave the calendar disagreeing with the schedule.
    if (existing.sessionId) {
      throw new ForbiddenException(
        'This entry belongs to a live session. Cancel the session instead.',
      );
    }

    await this.prisma.calendarEvent.delete({ where: { id } });
    return { ok: true };
  }

  /**
   * Reports an overlapping entry for the same batch or course, so the office
   * sees a double-booking rather than discovering it on the day.
   */
  private async findConflict(data: any) {
    if (!data.batchId && !data.courseId && !data.classId) return null;

    const clash = await this.prisma.calendarEvent.findFirst({
      where: {
        startAt: { lt: data.endAt },
        endAt: { gt: data.startAt },
        OR: [
          ...(data.batchId ? [{ batchId: data.batchId }] : []),
          ...(data.classId ? [{ classId: data.classId }] : []),
          ...(data.courseId ? [{ courseId: data.courseId }] : []),
        ],
      },
      select: { id: true, title: true, startAt: true },
    });

    return clash
      ? { message: `Overlaps "${clash.title}" already scheduled at that time.`, event: clash }
      : null;
  }
}
