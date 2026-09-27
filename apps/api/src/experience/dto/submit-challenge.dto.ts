import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class SubmitChallengeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20000)
  code!: string;

  @ApiProperty()
  @IsBoolean()
  passed!: boolean;
}
