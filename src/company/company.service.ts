import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../model/company.entity';
import { Repository } from 'typeorm';
import { CompanyType } from '../enum/company.enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  public async getAll(companyType: CompanyType) {
    const companyTypeValue =
      CompanyType[companyType as keyof typeof CompanyType];
    return await this.companyRepository.find({
      where: { companyType: companyTypeValue },
    });
  }
  public async findById(id: string): Promise<Company> {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.accs', 'acc', 'acc.isDeleted = false')
      .where('company.id = :id', { id })
      .getOne();

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
