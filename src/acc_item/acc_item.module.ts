import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccItem } from '../model/acc_item.entity';
import { AccItemController } from './acc_item.controller';
import { AccItemService } from './acc_item.service';
import { Acc } from '../model/acc.entity';
import { Company } from '../model/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccItem, Acc, Company])],
  controllers: [AccItemController],
  providers: [AccItemService],
})
export class AccItemModule {}
