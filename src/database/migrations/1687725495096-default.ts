import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687725495096 implements MigrationInterface {
    name = 'default1687725495096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
