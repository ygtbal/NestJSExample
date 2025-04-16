import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyId1744825592129 implements MigrationInterface {
    name = 'AddCompanyId1744825592129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_acc" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "total_acc" ADD CONSTRAINT "UQ_ffb3eb64a28ca45b426d4c7b339" UNIQUE ("company_id")`);
        await queryRunner.query(`ALTER TABLE "total_acc" ADD CONSTRAINT "FK_ffb3eb64a28ca45b426d4c7b339" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_acc" DROP CONSTRAINT "FK_ffb3eb64a28ca45b426d4c7b339"`);
        await queryRunner.query(`ALTER TABLE "total_acc" DROP CONSTRAINT "UQ_ffb3eb64a28ca45b426d4c7b339"`);
        await queryRunner.query(`ALTER TABLE "total_acc" DROP COLUMN "company_id"`);
    }

}
