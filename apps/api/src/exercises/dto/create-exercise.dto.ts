import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExerciseType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateExerciseOptionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(300)
  text!: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class CreateExerciseDto {
  @ApiProperty({ enum: ExerciseType })
  @IsEnum(ExerciseType)
  type!: ExerciseType;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  prompt!: string;

  @ApiPropertyOptional({ description: 'Explicação mostrada como feedback' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  explanation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ type: [String], description: 'Respostas aceitas (preencher lacuna)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  acceptedAnswers?: string[];

  @ApiPropertyOptional({
    type: [CreateExerciseOptionDto],
    description: 'Opções (múltipla escolha)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseOptionDto)
  options?: CreateExerciseOptionDto[];
}
