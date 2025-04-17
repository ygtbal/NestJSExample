import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalPaymentColumnToAcc1744889510973 implements MigrationInterface {
    name = 'AddTotalPaymentColumnToAcc1744889510973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc" ADD "total_payment" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc" DROP COLUMN "total_payment"`);
    }

}
