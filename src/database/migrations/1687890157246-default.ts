import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687890157246 implements MigrationInterface {
    name = 'default1687890157246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`alteration\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`alteration\``);
    }

}
