import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDTO } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  public async getAll() {
    return await this.companyService.getAll();
  }
  @Post()
  public async create(@Body() dto: CompanyDTO): Promise<CompanyDTO> {
    return await this.companyService.create(dto);
  }
}
