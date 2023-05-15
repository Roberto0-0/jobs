import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684190672209 implements MigrationInterface {
    name = 'default1684190672209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`materialStatus\` \`maritalStatus\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`maritalStatus\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`maritalStatus\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`maritalStatus\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`maritalStatus\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`maritalStatus\` \`materialStatus\` varchar(255) NOT NULL`);
    }

}
