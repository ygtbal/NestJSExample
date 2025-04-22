import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../model/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  public async getAll() {
    return await this.companyRepository.find();
  }
  public async findById(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
    });
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }
    return company;
  }
  public async update(id: string, dto: Partial<Company>): Promise<Company> {
    const updatedCompany = await this.companyRepository.preload({
      id,
      ...dto,
    });
    if (!updatedCompany) {
      throw new Error(`Company with id ${id} not found`);
    }
    return await this.companyRepository.save(updatedCompany);
  }
  public async create(dto: Company): Promise<Company> {
    return await this.companyRepository.save(dto);
  }
}
