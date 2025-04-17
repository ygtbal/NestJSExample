import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnTypeDecimalToInt1744919523454 implements MigrationInterface {
    name = 'ChangeColumnTypeDecimalToInt1744919523454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc_item" DROP COLUMN "payment"`);
        await queryRunner.query(`ALTER TABLE "acc_item" ADD "payment" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "total_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "unit_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "total_payment"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "total_payment" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "total_payment"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "total_payment" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "amount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "unit_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "acc" ADD "total_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc_item" DROP COLUMN "payment"`);
        await queryRunner.query(`ALTER TABLE "acc_item" ADD "payment" numeric NOT NULL`);
    }

}
