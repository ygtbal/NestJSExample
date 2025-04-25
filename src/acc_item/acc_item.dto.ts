/* eslint-disable @typescript-eslint/no-unsafe-call */
// acc_item.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDate, IsBoolean } from 'class-validator';

export class AccItemDto implements Readonly<AccItemDto> {
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;
  @ApiProperty({ required: true })
  @IsNumber()
  payment: number;
  @ApiProperty({ required: false })
  @IsDate()
  createdAt: Date;
  @IsDate()
  @ApiProperty({ required: false })
  updatedAt: Date;
  @ApiProperty({ required: false })
  @IsBoolean()
  isDeleted: boolean;
  @ApiProperty({ required: true })
  @IsUUID()
  accId: string;
}
