/* eslint-disable @typescript-eslint/no-unsafe-call */
// company.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEmail, IsBoolean, IsDate } from 'class-validator';
import { CompanyType } from '../enum/company.enum';

// it is readonly because it is used in the response
// and we don't want to allow the client to modify it
// and it is a DTO because it is used to transfer data
// between the client and the server
export class CompanyDTO implements Readonly<CompanyDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: true })
  address: string;
  @ApiProperty({ required: false })
  @IsString()
  phoneNumber: string;
  @ApiProperty({ required: true })
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
}
