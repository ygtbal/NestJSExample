import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccItemService } from './acc_item.service';
import { AccItemDto } from './acc_item.dto';
import { AccItem } from '../model/acc_item.entity';

@Controller('acc-item')
export class AccItemController {
  constructor(private readonly accItemService: AccItemService) {}
  @Get()
  public async getAll() {
    return await this.accItemService.getAll();
  }
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.accItemService.findById(id);
  }
  @Post()
  public async create(@Body() dto: AccItemDto): Promise<AccItem> {
    return await this.accItemService.create(dto);
  }
}
