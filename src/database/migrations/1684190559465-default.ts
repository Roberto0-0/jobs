import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684190559465 implements MigrationInterface {
    name = 'default1684190559465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`DateOfBirth\` \`dateOfBirth\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`dateOfBirth\` \`DateOfBirth\` datetime NOT NULL`);
    }

}
