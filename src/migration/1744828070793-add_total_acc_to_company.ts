import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalAccToCompany1744828070793 implements MigrationInterface {
    name = 'AddTotalAccToCompany1744828070793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "totalAcc" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "totalAcc"`);
    }

}
