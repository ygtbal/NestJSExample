import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acc } from '../model/acc.entity';
import { AccController } from './acc.controller';
import { AccService } from './acc.service';
import { Company } from '../model/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Acc, Company])],
  controllers: [AccController],
  providers: [AccService],
})
export class AccModule {}
