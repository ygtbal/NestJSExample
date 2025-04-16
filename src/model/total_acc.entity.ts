// total_acc.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';
@Entity({ name: 'total_acc' })
export class TotalAcc {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int', default: 0 })
  totalAcc: number;
  @OneToOne(() => Company, { cascade: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
