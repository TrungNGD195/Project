import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTaskNullableDetails1755096649916 implements MigrationInterface {
    name = 'AlterTaskNullableDetails1755096649916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "details" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "details" SET NOT NULL`);
    }

}
