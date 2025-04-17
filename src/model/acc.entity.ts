// acc.entity.ts
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Company } from './company.entity';
import { AccItem } from './acc_item.entity';

@Entity({ name: 'acc' })
export class Acc {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'decimal' })
  total_price: number;
  @Column({ type: 'varchar' })
  type: string;
  @Column({ type: 'decimal' })
  unit_price: number;
  @Column({ type: 'decimal' })
  amount: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'varchar', default: '' })
  description: string;
  @ManyToOne(() => Company, (company) => company.accs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;
  @OneToMany(() => AccItem, (acc_item) => acc_item.acc, {})
  acc_items: AccItem[];
}
