import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CompanyModule } from './company/company.module';
import { TotalAccModule } from './total_acc/total_acc.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CompanyModule,
    TotalAccModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
