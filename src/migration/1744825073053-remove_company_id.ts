import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCompanyId1744825073053 implements MigrationInterface {
    name = 'RemoveCompanyId1744825073053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_acc" DROP CONSTRAINT "FK_ffb3eb64a28ca45b426d4c7b339"`);
        await queryRunner.query(`ALTER TABLE "total_acc" DROP CONSTRAINT "REL_ffb3eb64a28ca45b426d4c7b33"`);
        await queryRunner.query(`ALTER TABLE "total_acc" DROP COLUMN "company_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_acc" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "total_acc" ADD CONSTRAINT "REL_ffb3eb64a28ca45b426d4c7b33" UNIQUE ("company_id")`);
        await queryRunner.query(`ALTER TABLE "total_acc" ADD CONSTRAINT "FK_ffb3eb64a28ca45b426d4c7b339" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
