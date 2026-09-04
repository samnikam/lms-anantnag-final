import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from '../common/decorators/roles.decorator';
import { Audit } from '../common/decorators/audit.decorator';
import { AuthUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';

class AnnounceDto {
  @IsString() title!: string;
  @IsString() body!: string;
  @IsOptional() @IsString() courseId?: string;
  @IsOptional() @IsString() batchId?: string;
  @IsOptional() @IsString() siteId?: string;
  @IsOptional() @IsArray() @IsEnum(Role, { each: true }) audience?: Role[];
  @IsOptional() @IsBoolean() pinned?: boolean;
}

@ApiTags('notifications')
@Controller()
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Get('notifications')
  list(@CurrentUser('id') userId: string, @Query('unread') unread?: string) {
    return this.notifications.list(userId, unread === 'true');
  }

  @Get('notifications/unread-count')
  unreadCount(@CurrentUser('id') userId: string) {
    return this.notifications.unreadCount(userId).then((count) => ({ count }));
  }

  @Post('notifications/:id/read')
  markRead(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.notifications.markRead(userId, id);
  }

  @Post('notifications/read-all')
  markAllRead(@CurrentUser('id') userId: string) {
    return this.notifications.markAllRead(userId);
  }

  @Get('announcements')
  listAnnouncements(
    @CurrentUser() actor: AuthUser,
    @Query('courseId') courseId?: string,
    @Query('siteId') siteId?: string,
  ) {
    // Anyone attached to a school reads their own school's notices plus the
    // division-wide ones; a Super Admin reads everything, or filters.
    const scope = actor.role === Role.SUPER_ADMIN ? siteId : (actor.siteId ?? siteId ?? undefined);
    return this.notifications.listAnnouncements({ courseId, siteId: scope });
  }

  @Post('announcements')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  @Audit('announcement.create', 'Announcement')
  announce(@CurrentUser() actor: AuthUser, @Body() dto: AnnounceDto) {
    // An Academic Admin speaks for their own school, whatever the body says.
    const siteId = actor.role === Role.SUPER_ADMIN ? dto.siteId : (actor.siteId ?? dto.siteId);
    return this.notifications.announce(actor.id, { ...dto, siteId });
  }

  @Delete('announcements/:id')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  @Audit('announcement.delete', 'Announcement')
  removeAnnouncement(@Param('id') id: string, @CurrentUser() actor: AuthUser) {
    return this.notifications.removeAnnouncement(id, actor);
  }
}
