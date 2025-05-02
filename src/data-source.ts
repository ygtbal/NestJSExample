import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './config/config.service';

export const AppDataSource = new DataSource(
  configService.getTypeOrmConfig() as DataSourceOptions,
);
