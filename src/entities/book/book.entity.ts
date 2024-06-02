import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Borrow } from '../borrow/borrow.entity';

@Entity('book', { orderBy: { id: 'DESC' } })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  title: string;

  @Column({ length: 100, nullable: false })
  code: string;

  @Column({ length: 100, nullable: false })
  author: string;

  @Column({ nullable: false })
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
