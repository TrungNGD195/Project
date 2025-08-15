import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GoogleProfilePayload } from './stratergies/google.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.usersRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email already registered');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, password: hashed });
    await this.usersRepo.save(user);
    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return this.buildAuthResponse(user);
  }

  // Stateless JWT logout is client-side (just discard token). Placeholder provided.
  async logout() {
    return { success: true };
  }

  private buildAuthResponse(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwt.sign(payload);
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    };
  }

  async oauthLogin(google: GoogleProfilePayload) {
    if (!google.email)
      throw new BadRequestException('Google account has no email');
    let user = await this.usersRepo.findOne({ where: { email: google.email } });
    if (!user) {
      user = this.usersRepo.create({
        email: google.email,
        full_name: google.full_name || 'Google User',
        // random placeholder password; user won't use password login
        password: await bcrypt.genSalt(10),
        role: 'user',
      });
      await this.usersRepo.save(user);
    }
    return this.buildAuthResponse(user);
  }
}
