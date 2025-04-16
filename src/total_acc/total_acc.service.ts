import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TotalAcc } from '../model/total_acc.entity';
import { Company } from '../model/company.entity';
import { Repository } from 'typeorm';
import { TotalAccDTO } from './total_acc.dto';

@Injectable()
export class TotalAccService {
  constructor(
    @InjectRepository(TotalAcc)
    private readonly totalAccRepository: Repository<TotalAcc>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  public async getAll(): Promise<TotalAcc[]> {
    return await this.totalAccRepository.find();
  }
  public async create(dto: TotalAccDTO): Promise<TotalAcc> {
    const company = await this.companyRepository.findOneByOrFail({
      id: dto.companyId,
    });

    const totalAcc = this.totalAccRepository.create({
      totalAcc: dto.totalAcc || 0,
      company,
    });

    return await this.totalAccRepository.save(totalAcc);
  }
  public async findById(id: string): Promise<TotalAcc> {
    const totalAcc = await this.totalAccRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!totalAcc) {
      throw new Error(`TotalAcc with id ${id} not found`);
    }
    return totalAcc;
  }
}
