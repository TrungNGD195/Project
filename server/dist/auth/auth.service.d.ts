import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepo;
    private readonly jwt;
    constructor(usersRepo: Repository<User>, jwt: JwtService);
    register(dto: CreateUserDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            full_name: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            full_name: string;
            role: string;
        };
    }>;
    logout(): Promise<{
        success: boolean;
    }>;
    private buildAuthResponse;
}
