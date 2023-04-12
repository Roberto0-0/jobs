import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681305797271 implements MigrationInterface {
    name = 'default1681305797271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`vacancies\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`location\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`vacancies\``);
    }

}
