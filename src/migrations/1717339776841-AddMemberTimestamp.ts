import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMemberTimestamp1717339776841 implements MigrationInterface {
    name = 'AddMemberTimestamp1717339776841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD \`penaltizedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`user\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`user\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`status\` \`status\` enum ('active', 'penaltized') NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP FOREIGN KEY \`FK_08897b166dee565859b7fb2fcc8\``);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'onborrow') NOT NULL DEFAULT ''active''`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` ADD CONSTRAINT \`FK_08897b166dee565859b7fb2fcc8\` FOREIGN KEY (\`userId\`) REFERENCES \`eigen\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`user\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`user\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`eigen\`.\`member\` DROP COLUMN \`penaltizedAt\``);
    }

}
