import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role, SubstitutionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { NotificationsService } from '../notifications/notifications.service';

const REQUEST_INCLUDE = {
  teacher: { select: { id: true, fullName: true, email: true } },
  cover: { select: { id: true, fullName: true } },
  decidedBy: { select: { id: true, fullName: true } },
  event: {
    select: {
      id: true,
      title: true,
      startAt: true,
      endAt: true,
      siteId: true,
      classId: true,
      schoolClass: { select: { id: true, name: true } },
    },
  },
} as const;

/**
 * The master timetable belongs to the academic office. A teacher who cannot
 * take a period asks for it to be covered instead of editing the schedule, and
 * the academic admin decides who takes it.
 */
@Injectable()
export class SubstitutionsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async request(actor: AuthUser, eventId: string, reason: string) {
    const event = await this.prisma.calendarEvent.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('That timetable entry no longer exists.');
    if (event.startAt < new Date()) {
      throw new BadRequestException('That period has already passed.');
    }

    const open = await this.prisma.substitutionRequest.findFirst({
      where: { eventId, teacherId: actor.id, status: SubstitutionStatus.PENDING },
    });
    if (open) throw new BadRequestException('You have already asked for this period to be covered.');

    const created = await this.prisma.substitutionRequest.create({
      data: { eventId, teacherId: actor.id, reason },
      include: REQUEST_INCLUDE,
    });

    // The academic office decides, so it is the academic office that is told.
    const admins = await this.prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        role: { in: [Role.ACADEMIC_ADMIN, Role.SUPER_ADMIN] },
        ...(event.siteId ? { OR: [{ siteId: event.siteId }, { siteId: null }] } : {}),
      },
      select: { id: true },
    });
    if (admins.length) {
      await this.notifications.notifyMany(
        admins.map((a) => a.id),
        {
          type: 'SYSTEM',
          title: 'Cover requested',
          body: `${created.teacher.fullName} cannot take ${created.event.title}.`,
          link: '/calendar',
        },
      );
    }

    return created;
  }

  /** A teacher sees their own requests; the academic office sees the school's. */
  list(actor: AuthUser, status?: SubstitutionStatus) {
    return this.prisma.substitutionRequest.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(actor.role === Role.TEACHER ? { teacherId: actor.id } : {}),
        ...(actor.role === Role.ACADEMIC_ADMIN && actor.siteId
          ? { event: { OR: [{ siteId: actor.siteId }, { siteId: null }] } }
          : {}),
      },
      include: REQUEST_INCLUDE,
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      take: 100,
    });
  }

  /** Withdrawn by the teacher who asked, while it is still undecided. */
  async cancel(actor: AuthUser, id: string) {
    const req = await this.prisma.substitutionRequest.findUnique({ where: { id } });
    if (!req) throw new NotFoundException('Request not found.');
    if (req.teacherId !== actor.id) throw new ForbiddenException('That request is not yours.');
    if (req.status !== SubstitutionStatus.PENDING) {
      throw new BadRequestException('That request has already been decided.');
    }
    return this.prisma.substitutionRequest.update({
      where: { id },
      data: { status: SubstitutionStatus.CANCELLED },
      include: REQUEST_INCLUDE,
    });
  }

  async decide(
    actor: AuthUser,
    id: string,
    data: { approve: boolean; coverId?: string; note?: string },
  ) {
    const req = await this.prisma.substitutionRequest.findUnique({ where: { id } });
    if (!req) throw new NotFoundException('Request not found.');
    if (req.status !== SubstitutionStatus.PENDING) {
      throw new BadRequestException('That request has already been decided.');
    }

    if (data.approve && data.coverId) {
      const cover = await this.prisma.user.findUnique({
        where: { id: data.coverId },
        select: { role: true },
      });
      if (cover?.role !== Role.TEACHER) {
        throw new BadRequestException('Only a teacher can cover a period.');
      }
    }

    const decided = await this.prisma.substitutionRequest.update({
      where: { id },
      data: {
        status: data.approve ? SubstitutionStatus.APPROVED : SubstitutionStatus.DECLINED,
        coverId: data.approve ? data.coverId : null,
        decidedById: actor.id,
        decidedAt: new Date(),
        decisionNote: data.note,
      },
      include: REQUEST_INCLUDE,
    });

    const told = [decided.teacherId, ...(decided.coverId ? [decided.coverId] : [])];
    await this.notifications.notifyMany(told, {
      type: 'SYSTEM',
      title: data.approve ? 'Cover arranged' : 'Cover request declined',
      body: data.approve
        ? `${decided.event.title} will be taken by ${decided.cover?.fullName ?? 'someone else'}.`
        : `${decided.event.title} — ${data.note ?? 'no reason given'}.`,
      link: '/calendar',
    });

    return decided;
  }
}
