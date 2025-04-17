// acc_item.entity.ts
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Acc } from './acc.entity';

@Entity({ name: 'acc_item' })
export class AccItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'decimal' })
  payment: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @ManyToOne(() => Acc, (acc) => acc.acc_items, { onDelete: 'CASCADE' })
  acc: Acc;
}
