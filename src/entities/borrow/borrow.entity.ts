import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../book/book.entity';
import { Member } from '../member/member.entity';

@Entity('borrow', { orderBy: { createdAt: 'DESC' } })
export class Borrow extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  returnedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;

  toJSON() {
    return this;
  }
}
