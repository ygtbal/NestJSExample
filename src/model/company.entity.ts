// company.entity.ts
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompanyType } from '../enum/company.enum';
import { Acc } from './acc.entity';

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

  @Column({ type: 'int', default: 0 })
  totalAcc: number;

  @Column({ type: 'int', default: 0 })
  paid: number;

  @Column({ type: 'int', default: 0 })
  rest: number;

  @OneToMany(() => Acc, (acc) => acc.company)
  accs: Acc[];
}
