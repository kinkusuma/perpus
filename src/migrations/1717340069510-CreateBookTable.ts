import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBookTable1717340069510 implements MigrationInterface {
    name = 'CreateBookTable1717340069510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`eigen\`.\`book\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`code\` varchar(100) NOT NULL, \`author\` varchar(100) NOT NULL, \`stock\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`penaltizedAt\` \`penaltizedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`penaltizedAt\` \`penaltizedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`eigen\`.\`book\``);
    }

}
