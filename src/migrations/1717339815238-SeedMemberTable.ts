import {
  MigrationInterface,
  QueryRunner,
  getRepository,
} from 'typeorm';
import { User } from '../entities/user/user.entity';
import { Member } from '../entities/member/member.entity';
import { memberUsers } from '../seeds/member.seed';

export class SeedMemberTable1717339815238
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
