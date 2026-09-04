import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, SubstitutionStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Roles } from '../common/decorators/roles.decorator';
import { Audit } from '../common/decorators/audit.decorator';
import { AuthUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { SubstitutionsService } from './substitutions.service';

class RequestSubstitutionDto {
  @IsString() eventId!: string;
  @IsString() @MinLength(4) reason!: string;
}

class DecideDto {
  @IsBoolean() approve!: boolean;
  @IsOptional() @IsString() coverId?: string;
  @IsOptional() @IsString() note?: string;
}

/**
 * A teacher asks for a period to be covered; the academic office decides. The
 * master timetable itself stays with the two admin roles.
 */
@ApiTags('substitutions')
@Controller('substitutions')
export class SubstitutionsController {
  constructor(private substitutions: SubstitutionsService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN, Role.TEACHER)
  list(@CurrentUser() actor: AuthUser, @Query('status') status?: SubstitutionStatus) {
    return this.substitutions.list(actor, status);
  }

  @Post()
  @Roles(Role.TEACHER)
  @Audit('substitution.request', 'SubstitutionRequest')
  request(@CurrentUser() actor: AuthUser, @Body() dto: RequestSubstitutionDto) {
    return this.substitutions.request(actor, dto.eventId, dto.reason);
  }

  @Patch(':id/cancel')
  @Roles(Role.TEACHER)
  @Audit('substitution.cancel', 'SubstitutionRequest')
  cancel(@Param('id') id: string, @CurrentUser() actor: AuthUser) {
    return this.substitutions.cancel(actor, id);
  }

  @Patch(':id/decide')
  @Roles(Role.SUPER_ADMIN, Role.ACADEMIC_ADMIN)
  @Audit('substitution.decide', 'SubstitutionRequest')
  decide(@Param('id') id: string, @Body() dto: DecideDto, @CurrentUser() actor: AuthUser) {
    return this.substitutions.decide(actor, id, dto);
  }
}
