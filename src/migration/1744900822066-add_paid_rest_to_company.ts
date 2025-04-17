import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaidRestToCompany1744900822066 implements MigrationInterface {
    name = 'AddPaidRestToCompany1744900822066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "paid" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "rest" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "rest"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "paid"`);
    }

}
