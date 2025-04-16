import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CompanyModule } from './company/company.module';
import { AccModule } from './acc/acc.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CompanyModule,
    AccModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
