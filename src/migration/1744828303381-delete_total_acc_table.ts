import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteTotalAccTable1744828303381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "total_acc"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback için tabloyu tekrar oluşturmak istersen buraya yaz
    await queryRunner.query(`
      CREATE TABLE "total_acc" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "totalAcc" integer NOT NULL DEFAULT 0,
        "company_id" uuid,
        CONSTRAINT "PK_total_acc_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_total_acc_company" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }
}
