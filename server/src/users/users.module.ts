import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from '../tasks/entities/task.entity';  // Import Task entity
import { TasksModule } from '../tasks/tasks.module';  // Import TasksModule

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), forwardRef(() => TasksModule)],  // Sử dụng forwardRef trong imports
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}