import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684190732437 implements MigrationInterface {
    name = 'default1684190732437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`AcademicEducation\` \`academicEducation\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`academicEducation\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`academicEducation\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`academicEducation\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`academicEducation\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`academicEducation\` \`AcademicEducation\` varchar(255) NOT NULL`);
    }

}
