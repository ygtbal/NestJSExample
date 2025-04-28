import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDTO } from './company.dto';
import { UpdateCompanyDTO } from './updateCompany.dto';
import { CompanyType } from '../enum/company.enum';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/type/:companyType')
  public async getAll(@Param('companyType') companyType: CompanyType) {
    return await this.companyService.getAll(companyType);
  }
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.companyService.findById(id);
  }
  @Post()
  public async create(@Body() dto: CompanyDTO): Promise<CompanyDTO> {
    return await this.companyService.create(dto);
  }
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDTO,
  ): Promise<CompanyDTO> {
    return await this.companyService.update(id, dto);
  }
}
