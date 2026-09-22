import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SubmitAnswerDto {
  @ApiPropertyOptional({ description: 'ID da opção escolhida (múltipla escolha)' })
  @IsOptional()
  @IsString()
  optionId?: string;

  @ApiPropertyOptional({ description: 'Texto respondido (preencher lacuna)' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  text?: string;
}
