import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1744728963215 implements MigrationInterface {
    name = 'MyMigration1744728963215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."company_companytype_enum" AS ENUM('buy', 'sell')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "createdBy" character varying(300) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300) NOT NULL, "address" character varying(300) NOT NULL, "phoneNumber" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "companyType" "public"."company_companytype_enum" NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_companytype_enum"`);
    }

}
