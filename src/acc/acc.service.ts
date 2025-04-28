import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acc } from '../model/acc.entity';
import { Company } from '../model/company.entity';
import { Repository, DataSource } from 'typeorm';
import { AccDTO } from './acc.dto';

@Injectable()
export class AccService {
  constructor(
    @InjectRepository(Acc)
    private readonly accRepository: Repository<Acc>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly dataSource: DataSource,
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
    const savedAcc = await this.accRepository.save(acc);

    company.totalAcc += Number(savedAcc.total_price);
    company.rest += Number(savedAcc.total_price);
    await this.companyRepository.save(company);
    return savedAcc;
  }
  public async update(id: string, dto: Partial<Acc>): Promise<Acc> {
    return await this.dataSource.transaction(async (manager) => {
      const acc = await manager.findOne(Acc, {
        where: { id },
        relations: ['acc_items', 'company'],
      });
      if (acc?.acc_items.length) {
        throw new Error('this has items');
      }
      if (!acc) {
        throw new Error(`Acc with id ${id} not found`);
      }
      const totalPriceDifference = acc.total_price - (dto.total_price ?? 0);
      const companyTotal = acc.company.totalAcc - totalPriceDifference;
      const companyRest = acc.company.rest - totalPriceDifference;
      const updatedAcc = await manager.preload(Acc, {
        id,
        ...dto,
      });
      if (!updatedAcc) {
        throw new Error('Failed to preload updated acc');
      }
      console.log('updatedAcc', updatedAcc);
      await manager.save(Acc, updatedAcc);
      const companyObj = {
        totalAcc: companyTotal,
        rest: companyRest,
      };
      const updatedCompany = await manager.preload(Company, {
        id: acc.company.id,
        ...companyObj,
      });
      if (!updatedCompany) {
        throw new Error('Failed to preload updated company');
      }
      await manager.save(Company, updatedCompany);
      console.log(updatedCompany);
      return acc;
    });
  }
  public async delete(id: string): Promise<Acc> {
    return await this.dataSource.transaction(async (manager) => {
      const acc = await manager.findOne(Acc, {
        where: { id },
        relations: ['acc_items', 'company'],
      });
      if (acc?.acc_items.length) {
        throw new Error('this has items');
      }
      if (!acc) {
        throw new Error(`Acc with id ${id} not found`);
      }
      const companyTotal = acc.company.totalAcc - acc.total_price;
      const companyRest = acc.company.rest - acc.total_price;
      const updatedCompany = await manager.preload(Company, {
        id: acc.company.id,
        totalAcc: companyTotal,
        rest: companyRest,
      });
      if (!updatedCompany) {
        throw new Error('Failed to preload updated company');
      }
      await manager.save(Company, updatedCompany);
      return await manager.remove(Acc, acc);
    });
  }
}
