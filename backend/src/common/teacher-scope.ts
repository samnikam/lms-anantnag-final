import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from './decorators/current-user.decorator';

/**
 * What a teacher is allowed to touch.
 *
 * A teacher teaches the classes and subjects an Academic Admin has assigned to
 * them, and nothing else. Hiding another class from the sidebar is not enough:
 * without a check here, a teacher could mark another teacher's register or
 * grade another teacher's subject by calling the API directly.
 *
 * The two admin roles are unrestricted by this — their own scoping is by site,
 * handled in site-scope.ts.
 */
@Injectable()
export class TeacherScope {
  constructor(private prisma: PrismaService) {}

  private applies(user: AuthUser): boolean {
    return user.role === Role.TEACHER;
  }

  /** Class ids this teacher is in charge of, or teaches a subject in. */
  async classIds(teacherId: string): Promise<string[]> {
    const [inCharge, teaches] = await Promise.all([
      this.prisma.schoolClass.findMany({
        where: { classTeacherId: teacherId },
        select: { id: true },
      }),
      this.prisma.classSubject.findMany({
        where: { teacherId },
        select: { classId: true },
      }),
    ]);
    return [...new Set([...inCharge.map((c) => c.id), ...teaches.map((c) => c.classId)])];
  }

  /** Subject ids assigned to this teacher, from either assignment route. */
  async courseIds(teacherId: string): Promise<string[]> {
    const [assigned, viaClass] = await Promise.all([
      this.prisma.courseTeacher.findMany({ where: { teacherId }, select: { courseId: true } }),
      this.prisma.classSubject.findMany({ where: { teacherId }, select: { courseId: true } }),
    ]);
    return [...new Set([...assigned.map((c) => c.courseId), ...viaClass.map((c) => c.courseId)])];
  }

  async assertClassAllowed(user: AuthUser, classId: string): Promise<void> {
    if (!this.applies(user)) return;
    const allowed = await this.classIds(user.id);
    if (!allowed.includes(classId)) {
      throw new ForbiddenException(
        'You are not assigned to this class. Ask the academic admin to assign you.',
      );
    }
  }

  async assertCourseAllowed(user: AuthUser, courseId: string): Promise<void> {
    if (!this.applies(user)) return;
    const allowed = await this.courseIds(user.id);
    if (!allowed.includes(courseId)) {
      throw new ForbiddenException(
        'You are not assigned to this subject. Ask the academic admin to assign you.',
      );
    }
  }

  /**
   * The class the given timetable entry or live session belongs to, checked
   * against what this teacher is assigned. A session they host is theirs
   * whatever class it names.
   */
  async assertEventAllowed(user: AuthUser, eventId: string): Promise<void> {
    if (!this.applies(user)) return;
    const event = await this.prisma.calendarEvent.findUnique({
      where: { id: eventId },
      select: { classId: true, courseId: true, createdById: true },
    });
    if (!event) return;
    if (event.createdById === user.id) return;

    const [classes, courses] = await Promise.all([this.classIds(user.id), this.courseIds(user.id)]);
    const ownsClass = !!event.classId && classes.includes(event.classId);
    const ownsCourse = !!event.courseId && courses.includes(event.courseId);
    if (!ownsClass && !ownsCourse) {
      throw new ForbiddenException('This period is not one of yours to mark.');
    }
  }
}
