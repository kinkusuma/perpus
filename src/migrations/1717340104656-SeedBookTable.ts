import {
  MigrationInterface,
  QueryRunner,
  getRepository,
} from 'typeorm';
import { Book } from '../entities/book/book.entity';
import { books } from '../seeds/book.seed';

export class SeedBookTable1717340104656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(Book).save(books);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
