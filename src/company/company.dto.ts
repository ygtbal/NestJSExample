/* eslint-disable @typescript-eslint/no-unsafe-call */
// company.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

// it is readonly because it is used in the response
// and we don't want to allow the client to modify it
// and it is a DTO because it is used to transfer data
// between the client and the server
export class CompanyDTO implements Readonly<CompanyDTO> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
}
