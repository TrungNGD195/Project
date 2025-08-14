"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1755096335201 = void 0;
class InitialMigration1755096335201 {
    constructor() {
        this.name = 'InitialMigration1755096335201';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "details" character varying NOT NULL, "creatorId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }
}
exports.InitialMigration1755096335201 = InitialMigration1755096335201;
//# sourceMappingURL=1755096335201-InitialMigration.js.map