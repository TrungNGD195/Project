import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity.js'; // Đảm bảo đường dẫn chính xác
import { Task } from '../tasks/entities/task.entity.js'; // Đảm bảo đường dẫn chính xác
import 'dotenv/config';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? '123456',
  database: process.env.DATABASE_NAME ?? 'task',
  entities: [User, Task],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: true,
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  subscribers: [],
  migrationsTableName: 'migrations',
});
