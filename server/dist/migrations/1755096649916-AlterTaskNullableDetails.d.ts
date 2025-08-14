import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AlterTaskNullableDetails1755096649916 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
