import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccItem } from '../model/acc_item.entity';
import { Acc } from '../model/acc.entity';
import { Repository, DataSource } from 'typeorm';
import { AccItemDto } from './acc_item.dto';
import { Company } from '../model/company.entity';

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
}
