import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';  // Các decorators dùng để validate dữ liệu

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;  // Tên đầy đủ của người dùng

  @IsEmail()
  @IsNotEmpty()
  email: string;  // Email của người dùng (phải hợp lệ)

  @IsString()
  @IsNotEmpty()
  @MinLength(6)  // Đặt độ dài mật khẩu tối thiểu là 6 ký tự
  password: string;  // Mật khẩu của người dùng
}
