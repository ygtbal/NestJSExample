import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnType1744846169757 implements MigrationInterface {
    name = 'ChangeColumnType1744846169757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc" DROP CONSTRAINT "FK_e842e71fbf898fa0a9fb15a8163"`);
        await queryRunner.query(`ALTER TABLE "acc" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "acc" ALTER COLUMN "company_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" ADD CONSTRAINT "FK_e842e71fbf898fa0a9fb15a8163" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc" DROP CONSTRAINT "FK_e842e71fbf898fa0a9fb15a8163"`);
        await queryRunner.query(`ALTER TABLE "acc" ALTER COLUMN "company_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "acc" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "acc" ADD CONSTRAINT "FK_e842e71fbf898fa0a9fb15a8163" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
