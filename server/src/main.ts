import 'dotenv/config'; // Đảm bảo rằng dotenv được cấu hình để load biến môi trường

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.CORS_ORIGIN ?? 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Cấu hình ValidationPipe để tự động xác thực các DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu vào, ví dụ từ string sang number
      whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
    }),
  );

  // Lấy PORT từ biến môi trường hoặc giá trị mặc định là 3000
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
