import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnTypePaidRest1744919449981 implements MigrationInterface {
    name = 'ChangeColumnTypePaidRest1744919449981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "paid"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "paid" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "rest"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "rest" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "rest"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "rest" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "paid"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "paid" numeric NOT NULL DEFAULT '0'`);
    }

}
