/* eslint-disable @typescript-eslint/no-unsafe-call */
// acc.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString, IsDate } from 'class-validator';

export class AccDTO implements Readonly<AccDTO> {
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;
  @ApiProperty({ required: true })
  @IsNumber()
  total_price: number;
  @ApiProperty({ required: true })
  @IsString()
  type: string;
  @ApiProperty({ required: true })
  @IsNumber()
  unit_price: number;
  @ApiProperty({ required: true })
  @IsNumber()
  amount: number;
  @ApiProperty({ required: false })
  @IsDate()
  createdAt: Date;
  @IsDate()
  @ApiProperty({ required: false })
  updatedAt: Date;
  @ApiProperty({ required: false })
  @IsString()
  description: string;
  @ApiProperty({ required: false })
  @IsUUID()
  companyId: string;
}
