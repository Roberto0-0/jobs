import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684553686357 implements MigrationInterface {
    name = 'default1684553686357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pushes\` ADD \`company_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_339097f7bb65e85c34f033df05b\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_5f310b10aa35cd5c4e98d4ca849\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`postId\` \`postId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_8bdd4a95f98ac83d4682b0f800d\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`information\` \`information\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_339097f7bb65e85c34f033df05b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_5f310b10aa35cd5c4e98d4ca849\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_8bdd4a95f98ac83d4682b0f800d\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`pushes\` ADD CONSTRAINT \`FK_87edcb59bb450a2ea1a0cb871df\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pushes\` DROP FOREIGN KEY \`FK_87edcb59bb450a2ea1a0cb871df\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_8bdd4a95f98ac83d4682b0f800d\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_5f310b10aa35cd5c4e98d4ca849\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_339097f7bb65e85c34f033df05b\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`information\` \`information\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_8bdd4a95f98ac83d4682b0f800d\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`postId\` \`postId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resumes\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_5f310b10aa35cd5c4e98d4ca849\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_339097f7bb65e85c34f033df05b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`pushes\` DROP COLUMN \`company_id\``);
    }

}
