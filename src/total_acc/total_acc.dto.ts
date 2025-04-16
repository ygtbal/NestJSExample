/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt } from 'class-validator';
export class TotalAccDTO implements Readonly<TotalAccDTO> {
  @ApiProperty({ example: 0 })
  @IsInt()
  totalAcc: number;

  @ApiProperty({ required: true })
  @IsUUID()
  companyId: string;
}
