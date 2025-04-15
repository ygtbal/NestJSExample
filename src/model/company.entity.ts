// company.entity.ts
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompanyType } from '../enum/company.enum';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  address: string;

  @Column({ type: 'varchar', length: 300 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'enum', enum: CompanyType })
  companyType: CompanyType;
}
