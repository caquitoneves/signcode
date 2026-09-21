import { PartialType } from '@nestjs/swagger';
import { CourseStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;
}
