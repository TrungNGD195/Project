import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';  // Import service để xử lý logic
import { CreateUserDto } from './dto/create-user.dto';  // Import DTO nếu có

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);  // Gọi service để tạo người dùng
  }

  @Get()
  findAll() {
    return this.usersService.findAll();  // Gọi service để lấy danh sách người dùng
  }
}
