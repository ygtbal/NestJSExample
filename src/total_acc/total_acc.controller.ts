import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TotalAccService } from './total_acc.service';
import { TotalAccDTO } from './total_acc.dto';
import { TotalAcc } from '../model/total_acc.entity';

@Controller('total-acc')
export class TotalAccController {
  constructor(private readonly totalAccService: TotalAccService) {}
  @Get()
  public async getAll() {
    return await this.totalAccService.getAll();
  }
  @Post()
  async create(@Body() dto: TotalAccDTO): Promise<TotalAcc> {
    return await this.totalAccService.create(dto);
  }
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.totalAccService.findById(id);
  }
}
