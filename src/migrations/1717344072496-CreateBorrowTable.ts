import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBorrowTable1717344072496 implements MigrationInterface {
    name = 'CreateBorrowTable1717344072496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`eigen\`.\`borrow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`returnedAt\` timestamp NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`memberId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`penaltizedAt\` \`penaltizedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`borrow\` ADD CONSTRAINT \`FK_c1c20055797527a629d7ca80357\` FOREIGN KEY (\`memberId\`) REFERENCES \`eigen\`.\`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`borrow\` ADD CONSTRAINT \`FK_f5c8ea379eee06ce1482f20d101\` FOREIGN KEY (\`bookId\`) REFERENCES \`eigen\`.\`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`borrow\` DROP FOREIGN KEY \`FK_f5c8ea379eee06ce1482f20d101\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`borrow\` DROP FOREIGN KEY \`FK_c1c20055797527a629d7ca80357\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`penaltizedAt\` \`penaltizedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`eigen\`.\`borrow\``);
    }

}
