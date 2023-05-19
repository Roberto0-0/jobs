import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684535072199 implements MigrationInterface {
    name = 'default1684535072199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_5f310b10aa35cd5c4e98d4ca849\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`vancancy\` \`vacancy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD \`company_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`vacancy\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`vacancy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_5f310b10aa35cd5c4e98d4ca849\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_5f310b10aa35cd5c4e98d4ca849\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`vacancy\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`vacancy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP COLUMN \`company_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`vacancy\` \`vancancy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_5f310b10aa35cd5c4e98d4ca849\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
