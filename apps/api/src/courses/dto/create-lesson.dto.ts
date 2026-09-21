import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'o-que-e-programacao' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug: apenas minúsculas, números e hífen' })
  @MaxLength(80)
  slug!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ description: 'Duração em segundos' })
  @IsOptional()
  @IsInt()
  @Min(0)
  durationSeconds?: number;
}
