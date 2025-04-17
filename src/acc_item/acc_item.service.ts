import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccItem } from '../model/acc_item.entity';
import { Acc } from '../model/acc.entity';
import { Repository } from 'typeorm';
import { AccItemDto } from './acc_item.dto';

@Injectable()
export class AccItemService {
  constructor(
    @InjectRepository(AccItem)
    private readonly accItemRepository: Repository<AccItem>,
    @InjectRepository(Acc)
    private readonly accRepository: Repository<Acc>,
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
    const acc = await this.accRepository.findOneByOrFail({
      id: dto.accId,
    });
    const accItem = this.accItemRepository.create({ ...dto, acc });
    return await this.accItemRepository.save(accItem);
  }
}
