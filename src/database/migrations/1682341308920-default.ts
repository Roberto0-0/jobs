import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682341308920 implements MigrationInterface {
    name = 'default1682341308920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`aboutCompany\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`aboutCompany\``);
    }

}
