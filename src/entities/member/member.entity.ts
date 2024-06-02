import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Borrow } from '../borrow/borrow.entity';

export enum EMemberStatus {
  ACTIVE = 'active',
  PENALTIZED = 'penaltized',
}

@Entity('member', { orderBy: { id: 'DESC' } })
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  code: string;

  @Column({
    type: 'enum',
    enum: EMemberStatus,
    default: EMemberStatus.ACTIVE,
  })
  status: EMemberStatus;

  @Column({ type: 'timestamp', nullable: true })
  penaltizedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Borrow, (borrow) => borrow.member)
  borrows: Borrow[];

  toJSON() {
    return this;
  }
}
