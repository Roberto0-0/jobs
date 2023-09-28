import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695888334948 implements MigrationInterface {
    name = 'default1695888334948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`resumes\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`phone\` varchar(255) NOT NULL, \`maritalStatus\` varchar(255) NOT NULL, \`academicEducation\` varchar(255) NOT NULL, \`information\` text NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'waiting', \`alteration\` tinyint NOT NULL DEFAULT 0, \`user_id\` varchar(255) NOT NULL, \`company_id\` varchar(255) NOT NULL, \`post_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`companyId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` varchar(36) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`vacancy\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`salary\` int NOT NULL, \`vacancies\` int NOT NULL, \`information\` text NULL, \`pushes\` int NOT NULL DEFAULT '0', \`company_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`complements\` (\`id\` varchar(36) NOT NULL, \`sector\` varchar(255) NOT NULL, \`employees\` int NOT NULL, \`location\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`company_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_98ea62a065f6959ae02686c364\` (\`location\`), UNIQUE INDEX \`IDX_dc7c9e9963aeb630ebb5cbb4a8\` (\`description\`), UNIQUE INDEX \`IDX_be4f7c4f3994a199483278f232\` (\`company_id\`), UNIQUE INDEX \`REL_be4f7c4f3994a199483278f232\` (\`company_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`CNPJ\` varchar(255) NOT NULL, \`company\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_6940517754783385e01836d250\` (\`CNPJ\`), UNIQUE INDEX \`IDX_5fc5f722482cb60492fb62d70e\` (\`company\`), UNIQUE INDEX \`IDX_d0af6f5866201d5cb424767744\` (\`email\`), UNIQUE INDEX \`IDX_198953acf6729c293483a0edb7\` (\`password\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pushes\` (\`id\` varchar(36) NOT NULL, \`pushed\` tinyint NOT NULL DEFAULT 0, \`user_id\` varchar(255) NOT NULL, \`post_id\` varchar(255) NOT NULL, \`company_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`phone\` varchar(255) NOT NULL, \`maritalStatus\` varchar(255) NOT NULL, \`academicEducation\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_55b1d8a5bfb2e76de30e69572f\` (\`phone\`), UNIQUE INDEX \`REL_35cd6c3fafec0bb5d072e24ea2\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_339097f7bb65e85c34f033df05b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_5f310b10aa35cd5c4e98d4ca849\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`resumes\` ADD CONSTRAINT \`FK_7968b5b42aa61d6e9429688b7d2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_8bdd4a95f98ac83d4682b0f800d\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`complements\` ADD CONSTRAINT \`FK_be4f7c4f3994a199483278f2328\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pushes\` ADD CONSTRAINT \`FK_9d0fd2ae5ca930aa7c10c3075b1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pushes\` ADD CONSTRAINT \`FK_0957a30068e491e5d7aa10d6f80\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`pushes\` ADD CONSTRAINT \`FK_87edcb59bb450a2ea1a0cb871df\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_35cd6c3fafec0bb5d072e24ea20\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_35cd6c3fafec0bb5d072e24ea20\``);
        await queryRunner.query(`ALTER TABLE \`pushes\` DROP FOREIGN KEY \`FK_87edcb59bb450a2ea1a0cb871df\``);
        await queryRunner.query(`ALTER TABLE \`pushes\` DROP FOREIGN KEY \`FK_0957a30068e491e5d7aa10d6f80\``);
        await queryRunner.query(`ALTER TABLE \`pushes\` DROP FOREIGN KEY \`FK_9d0fd2ae5ca930aa7c10c3075b1\``);
        await queryRunner.query(`ALTER TABLE \`complements\` DROP FOREIGN KEY \`FK_be4f7c4f3994a199483278f2328\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_8bdd4a95f98ac83d4682b0f800d\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_7968b5b42aa61d6e9429688b7d2\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_5f310b10aa35cd5c4e98d4ca849\``);
        await queryRunner.query(`ALTER TABLE \`resumes\` DROP FOREIGN KEY \`FK_339097f7bb65e85c34f033df05b\``);
        await queryRunner.query(`DROP INDEX \`REL_35cd6c3fafec0bb5d072e24ea2\` ON \`address\``);
        await queryRunner.query(`DROP INDEX \`IDX_55b1d8a5bfb2e76de30e69572f\` ON \`address\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`pushes\``);
        await queryRunner.query(`DROP INDEX \`IDX_198953acf6729c293483a0edb7\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_d0af6f5866201d5cb424767744\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_5fc5f722482cb60492fb62d70e\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_6940517754783385e01836d250\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`REL_be4f7c4f3994a199483278f232\` ON \`complements\``);
        await queryRunner.query(`DROP INDEX \`IDX_be4f7c4f3994a199483278f232\` ON \`complements\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc7c9e9963aeb630ebb5cbb4a8\` ON \`complements\``);
        await queryRunner.query(`DROP INDEX \`IDX_98ea62a065f6959ae02686c364\` ON \`complements\``);
        await queryRunner.query(`DROP TABLE \`complements\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`resumes\``);
    }

}
