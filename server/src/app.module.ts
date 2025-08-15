import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module'; // Import UsersModule
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import * as path from 'path'; // Đảm bảo sử dụng path để tạo đường dẫn chính xác
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    AuthModule,
    TasksModule,
    UsersModule, // Đảm bảo rằng UsersModule đã được đăng ký ở đây
    TypeOrmModule.forRoot({
      type: 'postgres', // Loại cơ sở dữ liệu (PostgreSQL)
      host: process.env.DATABASE_HOST ?? 'localhost', // Giá trị mặc định nếu là undefined
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10), // Giá trị mặc định nếu là undefined
      username: process.env.DATABASE_USERNAME ?? 'postgres', // Giá trị mặc định nếu là undefined
      password: process.env.DATABASE_PASSWORD ?? '123456', // Giá trị mặc định nếu là undefined
      database: process.env.DATABASE_NAME ?? 'task', // Giá trị mặc định nếu là undefined
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')], // Đảm bảo dùng path.join() cho tương thích tốt hơn
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // Nếu true, tự động đồng bộ schema
      logging: true, // Bật logging để kiểm tra các câu lệnh SQL
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
