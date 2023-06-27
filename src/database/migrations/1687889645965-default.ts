import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687889645965 implements MigrationInterface {
    name = 'default1687889645965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`option\` \`status\` varchar(255) NOT NULL DEFAULT 'waiting'`);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'waiting'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'waiting'`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`status\` \`option\` varchar(255) NOT NULL DEFAULT 'waiting'`);
    }

}
