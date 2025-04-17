import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccItemTable1744888920848 implements MigrationInterface {
    name = 'CreateAccItemTable1744888920848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "acc_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accId" uuid, CONSTRAINT "PK_2f14e676e0d5b65a1e3fca52224" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "acc_item" ADD CONSTRAINT "FK_af9307e24cf29ecd4ba21689b91" FOREIGN KEY ("accId") REFERENCES "acc"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc_item" DROP CONSTRAINT "FK_af9307e24cf29ecd4ba21689b91"`);
        await queryRunner.query(`DROP TABLE "acc_item"`);
    }

}
