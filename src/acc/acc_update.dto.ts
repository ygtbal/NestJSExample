import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AccUpdateDto implements Readonly<AccUpdateDto> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  total_price: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  unit_price: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount: number;
}
