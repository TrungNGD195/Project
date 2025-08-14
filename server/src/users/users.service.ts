import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,  // Inject repository để thao tác với bảng users
  ) {}

  // Tạo người dùng mới
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);  // Tạo một entity mới từ DTO
    return await this.usersRepository.save(user);  // Lưu người dùng vào cơ sở dữ liệu
  }

  // Lấy danh sách tất cả người dùng
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();  // Lấy tất cả người dùng
  }

  // Tìm người dùng theo ID
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },  // Dùng đối tượng { where: { id } } cho TypeORM
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);  // Nếu không tìm thấy, ném lỗi
    }

    return user;  // Trả về người dùng nếu tìm thấy
  }

  // Cập nhật thông tin người dùng
  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(id);  // Tìm người dùng trước khi cập nhật
    await this.usersRepository.update(id, updateUserDto);  // Cập nhật thông tin người dùng
    return this.findOne(id);  // Trả về thông tin người dùng đã cập nhật
  }

  // Xóa người dùng theo ID
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);  // Tìm người dùng trước khi xóa
    await this.usersRepository.delete(id);  // Xóa người dùng theo ID
  }
}
