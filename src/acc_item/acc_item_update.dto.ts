import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AccItemUpdateDto implements Readonly<AccItemUpdateDto> {
  @ApiProperty({ required: true })
  @IsNumber()
  payment: number;
}
