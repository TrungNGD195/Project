"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTaskNullableDetails1755096649916 = void 0;
class AlterTaskNullableDetails1755096649916 {
    constructor() {
        this.name = 'AlterTaskNullableDetails1755096649916';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "details" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "details" SET NOT NULL`);
    }
}
exports.AlterTaskNullableDetails1755096649916 = AlterTaskNullableDetails1755096649916;
//# sourceMappingURL=1755096649916-AlterTaskNullableDetails.js.map