import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AccService } from './acc.service';
import { AccDTO } from './acc.dto';
import { Acc } from '../model/acc.entity';
import { AccUpdateDto } from './acc_update.dto';

@Controller('acc')
export class AccController {
  constructor(private readonly accService: AccService) {}

  @Get()
  public async getAll() {
    return await this.accService.getAll();
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.accService.findById(id);
  }

  @Post()
  public async create(@Body() dto: AccDTO): Promise<Acc> {
    return await this.accService.create(dto);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: AccUpdateDto,
  ): Promise<Acc> {
    return await this.accService.update(id, dto);
  }
}
