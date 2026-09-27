import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsObject } from 'class-validator';

export class RespondAssessmentDto {
  @ApiProperty({ enum: ['BEFORE', 'AFTER'] })
  @IsIn(['BEFORE', 'AFTER'])
  phase!: 'BEFORE' | 'AFTER';

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsObject()
  answers!: Record<string, string>;
}
