import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { EnrollmentStatus } from '@prisma/client';

export class CreateYearDto {
  @IsString() name!: string;
  @Type(() => Date) @IsDate() startDate!: Date;
  @Type(() => Date) @IsDate() endDate!: Date;
  @IsOptional() @IsBoolean() isCurrent?: boolean;
}

export class CreateClassDto {
  @IsString() academicYearId!: string;
  @IsString() siteId!: string;
  @IsString() name!: string;
  @IsOptional() @IsInt() level?: number;
  @IsOptional() @IsString() description?: string;
}

export class UpdateClassDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() classTeacherId?: string;
  @IsOptional() @IsInt() level?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsBoolean() active?: boolean;
}

export class AddClassSubjectDto {
  /** A class takes a whole scheme of subjects, so they are chosen together.
   *  courseId is kept for existing callers. */
  @IsOptional() @IsString() courseId?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) courseIds?: string[];
  /** null clears the teacher; omitted leaves whoever is there. */
  @IsOptional() @IsString() teacherId?: string | null;
  @IsOptional() @IsInt() periodsPerWeek?: number;
}

export class EnrollInClassDto {
  /** A class takes a roomful of learners, so admitting them one at a time is
   *  the wrong unit of work. studentId is kept for existing callers. */
  @IsOptional() @IsString() studentId?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) studentIds?: string[];
  @IsOptional() @IsString() batchId?: string;
}

export class CreateBatchDto {
  @IsString() academicYearId!: string;
  @IsString() name!: string;
  @IsOptional() @IsString() siteId?: string;
  @IsOptional() @IsString() grade?: string;
  @IsOptional() @IsString() section?: string;
  @IsOptional() @IsString() classId?: string;
}

export class UpdateBatchDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() siteId?: string;
  @IsOptional() @IsString() grade?: string;
  @IsOptional() @IsString() section?: string;
  @IsOptional() @IsBoolean() active?: boolean;
}

export class EnrollDto {
  @IsString() studentId!: string;
  @IsString() courseId!: string;
  @IsOptional() @IsString() batchId?: string;
}

export class EnrollManyDto {
  @IsArray() @ArrayNotEmpty() @IsString({ each: true }) studentIds!: string[];
  @IsString() courseId!: string;
  @IsOptional() @IsString() batchId?: string;
}

export class EnrollBatchDto {
  @IsString() batchId!: string;
  @IsString() courseId!: string;
}

export class EnrollmentStatusDto {
  @IsEnum(EnrollmentStatus) status!: EnrollmentStatus;
}

export class TransferEnrollmentDto {
  @IsString() toBatchId!: string;
  @IsOptional() @IsString() reason?: string;
}

export class WithdrawEnrollmentDto {
  @IsOptional() @IsString() reason?: string;
}
