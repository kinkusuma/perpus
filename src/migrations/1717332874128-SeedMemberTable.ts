import {
  MigrationInterface,
  QueryRunner,
  getRepository,
} from 'typeorm';
import { Member } from '../entities/member/member.entity';
import { User } from '../entities/user/user.entity';
import { memberUsers } from '../seeds/member.seed';

export class SeedMemberTable1717332874128
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    memberUsers.forEach(async (member) => {
      const user = await getRepository(User).findOne({
        firstName: member.name,
      });
      if (user) {
        await getRepository(Member).save({
          user: user,
          code: member.code,
        });
      }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
