import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceKind, AttendanceStatus, Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Roles } from '../common/decorators/roles.decorator';
import { Audit } from '../common/decorators/audit.decorator';
import { AuthUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import { resolveSiteFilter } from '../common/site-scope';
import { TeacherScope } from '../common/teacher-scope';
import { AttendanceService } from './attendance.service';

class MarkEntry {
  @IsString() studentId!: string;
  @IsEnum(AttendanceStatus) status!: AttendanceStatus;
  @IsOptional() @IsString() remarks?: string;
}

class MarkSessionDto {
  @IsArray() @ArrayNotEmpty() @Type(() => MarkEntry) entries!: MarkEntry[];
}

class MarkClassDto {
  @IsOptional() @Type(() => Date) @IsDate() date?: Date;
  @IsArray() @ValidateNested({ each: true }) @Type(() => MarkEntry) entries!: MarkEntry[];
}

class CorrectDto {
  @IsEnum(AttendanceStatus) status!: AttendanceStatus;
  @IsString() @MinLength(5) reason!: string;
}

class ListAttendanceQuery {
  @IsOptional() @IsString() studentId?: string;
  @IsOptional() @IsString() sessionId?: string;
  @IsOptional() @IsString() classroomId?: string;
  @IsOptional() @IsEnum(AttendanceKind) kind?: AttendanceKind;
  @IsOptional() @Type(() => Date) @IsDate() from?: Date;
  @IsOptional() @Type(() => Date) @IsDate() to?: Date;
}

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(
    private attendance: AttendanceService,
    private users: UsersService,
    private teacherScope: TeacherScope,
  ) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  list(@Query() q: ListAttendanceQuery) {
    return this.attendance.list(q);
  }

  /** Everything on a given day that attendance can be taken for. */
  @Get('day')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  day(
    @CurrentUser() actor: AuthUser,
    @Query('date') date?: string,
    @Query('siteId') siteId?: string,
  ) {
    return this.attendance.dayRegister(
      date ? new Date(date) : new Date(),
      resolveSiteFilter(actor, siteId),
    );
  }

  /**
   * The daily class register.
   *
   * A Super Admin picks a school, or sees every school until they do. An
   * Academic Admin is held to their own. A teacher sees only the classes they
   * are in charge of or teach a subject in — listing a school's whole
   * timetable to someone who cannot mark any of it is noise at best, and shows
   * them another school's roll at worst.
   */
  @Get('classes')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  async classRegisterDay(
    @CurrentUser() actor: AuthUser,
    @Query('date') date?: string,
    @Query('siteId') siteId?: string,
  ) {
    const mine =
      actor.role === Role.TEACHER ? await this.teacherScope.classIds(actor.id) : undefined;

    return this.attendance.classRegisterDay(
      date ? new Date(date) : new Date(),
      actor.role === Role.TEACHER
        ? (actor.siteId ?? undefined)
        : resolveSiteFilter(actor, siteId),
      mine,
    );
  }

  @Get('classes/:classId/roster')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  async classRoster(
    @Param('classId') classId: string,
    @CurrentUser() actor: AuthUser,
    @Query('date') date?: string,
  ) {
    await this.teacherScope.assertClassAllowed(actor, classId);
    return this.attendance.classRoster(classId, date ? new Date(date) : new Date());
  }

  @Post('classes/:classId/mark')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  @Audit('attendance.mark_class', 'Attendance')
  async markClass(
    @Param('classId') classId: string,
    @Body() dto: MarkClassDto,
    @CurrentUser() actor: AuthUser,
  ) {
    // A teacher takes the register for their own classes, not the school's.
    await this.teacherScope.assertClassAllowed(actor, classId);
    return this.attendance.markClassRegister(
      classId,
      dto.date ?? new Date(),
      dto.entries,
      actor.id,
    );
  }

  @Get('events/:eventId/roster')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  eventRoster(@Param('eventId') eventId: string) {
    return this.attendance.eventRoster(eventId);
  }

  @Post('events/:eventId/mark')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  @Audit('attendance.mark_period', 'Attendance')
  markEvent(
    @Param('eventId') eventId: string,
    @Body() dto: MarkSessionDto,
    @CurrentUser('id') markedById: string,
  ) {
    return this.attendance.markEvent(eventId, dto.entries, markedById);
  }

  @Get('sessions/:sessionId/roster')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  roster(@Param('sessionId') sessionId: string) {
    return this.attendance.sessionRoster(sessionId);
  }

  @Get('my-summary')
  @Roles(Role.STUDENT)
  mySummary(@CurrentUser('id') studentId: string, @Query('courseId') courseId?: string) {
    return this.attendance.studentSummary(studentId, courseId);
  }

  /** Guardian view — access is checked against the approved link, not the URL. */
  @Get('students/:studentId/summary')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER, Role.PARENT)
  async studentSummary(
    @Param('studentId') studentId: string,
    @CurrentUser() user: AuthUser,
    @Query('courseId') courseId?: string,
  ) {
    await this.users.assertParentAccess(user, studentId);
    return this.attendance.studentSummary(studentId, courseId);
  }

  @Get('sites/summary')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.DEPT_OVERSIGHT)
  siteSummary(@Query('from') from?: string, @Query('to') to?: string) {
    return this.attendance.siteSummary(
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  @Post('sessions/:sessionId/mark')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  @Audit('attendance.mark', 'Attendance')
  mark(
    @Param('sessionId') sessionId: string,
    @Body() dto: MarkSessionDto,
    @CurrentUser('id') markedById: string,
  ) {
    return this.attendance.markSession(sessionId, dto.entries, markedById);
  }

  @Patch(':id/correct')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN)
  @Audit('attendance.correct', 'Attendance')
  correct(@Param('id') id: string, @Body() dto: CorrectDto, @CurrentUser('id') actorId: string) {
    return this.attendance.correct(id, dto.status, dto.reason, actorId);
  }
}
