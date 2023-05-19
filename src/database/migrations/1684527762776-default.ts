import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684527762776 implements MigrationInterface {
    name = 'default1684527762776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`likes\` \`pushes\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pushes\` CHANGE \`liked\` \`pushed\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pushes\` CHANGE \`pushed\` \`liked\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`pushes\` \`likes\` int NOT NULL DEFAULT '0'`);
    }

}
