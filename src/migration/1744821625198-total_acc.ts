import { MigrationInterface, QueryRunner } from "typeorm";

export class TotalAcc1744821625198 implements MigrationInterface {
    name = 'TotalAcc1744821625198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "total_acc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalAcc" integer NOT NULL DEFAULT '0', "company_id" uuid, CONSTRAINT "REL_ffb3eb64a28ca45b426d4c7b33" UNIQUE ("company_id"), CONSTRAINT "PK_2a8c7b7abbac9cef74b8f962b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "total_acc" ADD CONSTRAINT "FK_ffb3eb64a28ca45b426d4c7b339" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_acc" DROP CONSTRAINT "FK_ffb3eb64a28ca45b426d4c7b339"`);
        await queryRunner.query(`DROP TABLE "total_acc"`);
    }

}
