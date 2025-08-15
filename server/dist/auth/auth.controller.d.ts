import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
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
    googleAuth(): void;
    googleCallback(req: any, res: any): Promise<any>;
}
