import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687722879608 implements MigrationInterface {
    name = 'Init1687722879608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('CREATED', 'COMPLETED', 'PENDING', 'IN_PROGRESS')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "task_name" character varying NOT NULL, "task_description" character varying NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'CREATED', "responsible_name" character varying NOT NULL, "project_Id" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_271ae4724a23acd1ef28ec73550" FOREIGN KEY ("project_Id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_271ae4724a23acd1ef28ec73550"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    }

}
