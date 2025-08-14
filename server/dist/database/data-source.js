"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
require("reflect-metadata");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'task',
    entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
    migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source.js.map