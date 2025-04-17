import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acc } from '../model/acc.entity';
import { Company } from '../model/company.entity';
import { Repository } from 'typeorm';
import { AccDTO } from './acc.dto';

@Injectable()
export class AccService {
  constructor(
    @InjectRepository(Acc)
    private readonly accRepository: Repository<Acc>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  public async getAll(): Promise<Acc[]> {
    return await this.accRepository.find();
  }

  public async findById(id: string): Promise<Acc> {
    const acc = await this.accRepository.findOne({
      where: { id },
    });
    if (!acc) {
      throw new Error(`Acc with id ${id} not found`);
    }
    return acc;
  }

  public async create(dto: AccDTO): Promise<Acc> {
    const company = await this.companyRepository.findOneByOrFail({
      id: dto.companyId,
    });
    const acc = this.accRepository.create({ ...dto, company });
    console.log('acc', acc);
    const savedAcc = await this.accRepository.save(acc);

    company.totalAcc += Number(savedAcc.total_price);
    company.rest += Number(savedAcc.total_price);
    await this.companyRepository.save(company);
    return savedAcc;
  }
}
