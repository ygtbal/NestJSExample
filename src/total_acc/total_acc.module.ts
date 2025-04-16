// total_acc.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TotalAcc } from '../model/total_acc.entity';
import { TotalAccController } from './total_acc.controller';
import { TotalAccService } from './total_acc.service';
import { Company } from '../model/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TotalAcc, Company])],
  controllers: [TotalAccController],
  providers: [TotalAccService],
})
export class TotalAccModule {}
