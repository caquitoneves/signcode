import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'programacao-do-zero' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug: apenas minúsculas, números e hífen' })
  @MaxLength(80)
  slug!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
