import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpsertLessonTranslationDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  summary?: string;

  @ApiPropertyOptional({ description: 'Conteúdo em Markdown' })
  @IsOptional()
  @IsString()
  bodyMarkdown?: string;

  @ApiPropertyOptional({ description: 'Legenda' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ description: 'Transcrição' })
  @IsOptional()
  @IsString()
  transcript?: string;

  @ApiPropertyOptional({ type: [String], description: 'Objetivos de aprendizagem' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, { each: true })
  objectives?: string[];
}
