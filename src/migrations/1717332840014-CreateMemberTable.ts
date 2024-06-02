import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMemberTable1717332840014
  implements MigrationInterface {
  name = 'CreateMemberTable1717332840014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`CREATE TABLE \`eigen\`.\`user\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `CREATE TABLE \`eigen\`.\`member\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(100) NOT NULL, \`status\` enum ('active', 'inactive', 'onborrow') NOT NULL DEFAULT 'active', \`userId\` int NULL, UNIQUE INDEX \`REL_08897b166dee565859b7fb2fcc\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_08897b166dee565859b7fb2fcc\` ON \`eigen\`.\`member\``,
    );
    await queryRunner.query(`DROP TABLE \`eigen\`.\`member\``);
    // await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`eigen\`.\`user\``);
    // await queryRunner.query(`DROP TABLE \`eigen\`.\`user\``);
  }
}
