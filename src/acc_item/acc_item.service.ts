import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccItem } from '../model/acc_item.entity';
import { Acc } from '../model/acc.entity';
import { Repository, DataSource } from 'typeorm';
import { AccItemDto } from './acc_item.dto';
import { Company } from '../model/company.entity';
import { error } from 'console';

@Injectable()
export class AccItemService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(AccItem)
    private readonly accItemRepository: Repository<AccItem>,
    @InjectRepository(Acc)
    private readonly accRepository: Repository<Acc>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAll(): Promise<AccItem[]> {
    return await this.accItemRepository.find();
  }

  public async findById(id: string): Promise<AccItem> {
    const accItem = await this.accItemRepository.findOne({
      where: { id },
    });
    if (!accItem) {
      throw new Error(`AccItem with id ${id} not found`);
    }
    return accItem;
  }
  public async create(dto: AccItemDto): Promise<AccItem> {
    return await this.dataSource.transaction(async (manager) => {
      const acc = await manager.findOne(Acc, {
        where: { id: dto.accId },
        relations: ['company'],
      });
      if (!acc) {
        throw new Error(`Acc with id ${dto.accId} not found`);
      } else {
        const accItem = manager.create(AccItem, { ...dto, acc });
        const savedAccItem = await manager.save(AccItem, accItem);
        acc.total_payment += Number(savedAccItem.payment);
        await manager.save(Acc, acc);
        const company = acc.company;
        company.paid += Number(savedAccItem.payment);
        company.rest = company.totalAcc - company.paid;
        await manager.save(Company, company);
        return savedAccItem;
      }
    });
  }
  public async update(id: string, dto: Partial<AccItem>): Promise<AccItem> {
    return await this.dataSource.transaction(async (manager) => {
      const accItem = await manager.findOne(AccItem, {
        where: { id },
        relations: ['acc', 'acc.company'],
      });
      if (!accItem) {
        throw new Error(`Acc Item with id ${id} not found`);
      }

      const updatedAccItem = await manager.preload(AccItem, {
        id,
        ...dto,
      });

      if (!updatedAccItem) {
        throw new Error(`Failed to preload AccItem with id ${id}`);
      }
      const differ = accItem.payment - (dto.payment ?? 0);
      const total_payment = accItem.acc.total_payment - differ;
      const accObj = { total_payment };
      const updatedAcc = await manager.preload(Acc, {
        id: accItem.acc.id,
        ...accObj,
      });
      if (!updatedAcc) {
        throw new Error(`Failed to preload Acc with id ${accItem.acc.id}`);
      }
      await manager.save(Acc, updatedAcc);
      const company = accItem.acc.company;
      const companyPaid = company.paid - differ;
      const companyRes = company.totalAcc - companyPaid;
      const compObj = {
        paid: companyPaid,
        rest: companyRes,
      };
      const updatedCompany = await manager.preload(Company, {
        id: company.id,
        ...compObj,
      });
      if (!updatedCompany) {
        throw new error(`Company not found`);
      }
      await manager.save(Company, updatedCompany);
      return await manager.save(AccItem, updatedAccItem);
    });
  }
  public async delete(id: string): Promise<AccItem> {
    return await this.dataSource.transaction(async (manager) => {
      const accItem = await manager.findOne(AccItem, {
        where: { id },
        relations: ['acc', 'acc.company'],
      });
      if (!accItem) {
        throw new Error(`Acc Item with id ${id} not found`);
      }
      const differ = accItem.payment;
      const total_payment = accItem.acc.total_payment - differ;
      const accObj = { total_payment };
      const updatedAcc = await manager.preload(Acc, {
        id: accItem.acc.id,
        ...accObj,
      });
      if (!updatedAcc) {
        throw new Error(`Failed to preload Acc with id ${accItem.acc.id}`);
      }
      await manager.save(Acc, updatedAcc);
      const company = accItem.acc.company;
      const companyPaid = company.paid - differ;
      const companyRes = company.totalAcc - companyPaid;
      const compObj = {
        paid: companyPaid,
        rest: companyRes,
      };
      const updatedCompany = await manager.preload(Company, {
        id: company.id,
        ...compObj,
      });
      if (!updatedCompany) {
        throw new error(`Company not found`);
      }
      const accItemObj = {
        ...accItem,
        isDeleted: true,
      };
      await manager.save(Company, updatedCompany);
      return await manager.save(AccItem, accItemObj);
    });
  }
}
