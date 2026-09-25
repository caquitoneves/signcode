import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { SUPPORTED_LANGUAGES } from '../languages';

export class UpsertLessonVideoDto {
  @ApiProperty({ enum: SUPPORTED_LANGUAGES })
  @IsIn(SUPPORTED_LANGUAGES as unknown as string[])
  languageCode!: string;

  @ApiProperty({
    example: 'youtube',
    description: "Provedor: 'youtube' | 'cloudflare' | 'bunny' | 'mux'",
  })
  @IsString()
  @MaxLength(40)
  provider!: string;

  @ApiProperty({ description: 'ID do vídeo no provedor' })
  @IsString()
  @MaxLength(200)
  externalId!: string;

  @ApiPropertyOptional({ description: 'Duração em segundos' })
  @IsOptional()
  @IsInt()
  @Min(0)
  durationSeconds?: number;
}
