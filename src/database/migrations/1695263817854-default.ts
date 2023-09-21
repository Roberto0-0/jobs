import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695263817854 implements MigrationInterface {
    name = 'default1695263817854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_8bdd4a95f98ac83d4682b0f800d\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_8bdd4a95f98ac83d4682b0f800d\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_8bdd4a95f98ac83d4682b0f800d\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_8bdd4a95f98ac83d4682b0f800d\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
