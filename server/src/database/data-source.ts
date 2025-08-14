import { DataSource } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';

// Use both ts + js globs (harmless if one set missing) without relying on __filename / __dirname
export const AppDataSource = new DataSource({
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
