import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccTableMigration1744839246338 implements MigrationInterface {
    name = 'CreateAccTableMigration1744839246338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "acc" ("id" uuid NOT NULL, "total_price" numeric NOT NULL, "type" character varying NOT NULL, "unit_price" numeric NOT NULL, "amount" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL DEFAULT '', "company_id" uuid NOT NULL, CONSTRAINT "PK_d2a1da14d1c8fe18717815766e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "acc" ADD CONSTRAINT "FK_e842e71fbf898fa0a9fb15a8163" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acc" DROP CONSTRAINT "FK_e842e71fbf898fa0a9fb15a8163"`);
        await queryRunner.query(`DROP TABLE "acc"`);
    }

}
