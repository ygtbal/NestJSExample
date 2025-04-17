/* eslint-disable @typescript-eslint/no-unsafe-call */
// company.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsEmail,
  IsBoolean,
  IsDate,
  IsInt,
  IsArray,
} from 'class-validator';
import { CompanyType } from '../enum/company.enum';
import { Acc } from '../model/acc.entity';

// it is readonly because it is used in the response
// and we don't want to allow the client to modify it
// and it is a DTO because it is used to transfer data
// between the client and the server
export class CompanyDTO implements Readonly<CompanyDTO> {
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ required: false })
  @IsString()
  phoneNumber: string;
  @ApiProperty({ required: false })
  @IsEmail()
  email: string;
  @ApiProperty({ required: true })
  @IsString()
  companyType: CompanyType;
  @ApiProperty({ required: false })
  @IsBoolean()
  isActive: boolean;
  @ApiProperty({ required: false })
  @IsBoolean()
  isDeleted: boolean;
  @ApiProperty({ required: false })
  @IsDate()
  createdAt: Date;
  @ApiProperty({ required: false })
  @IsDate()
  updatedAt: Date;
  @ApiProperty({ required: false })
  @IsInt()
  totalAcc: number;
  @ApiProperty({ required: false })
  @IsInt()
  paid: number;
  @ApiProperty({ required: false })
  @IsInt()
  rest: number;
  @ApiProperty({ required: false })
  @IsArray()
  accs: Acc[]; // it is an array of acc ids
}
