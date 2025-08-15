import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('logout')
  logout() {
    return this.auth.logout();
  }

  // Google OAuth: redirect to consent screen
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return; // handled by passport
  }

  // Google OAuth callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: any) {
    const result = await this.auth.oauthLogin(req.user);
    // For SPA: redirect back with token as URL fragment (adjust for your frontend)
    const redirectUrl = new URL('http://localhost:5173');
    redirectUrl.hash = `accessToken=${encodeURIComponent(result.accessToken)}`;
    return res.redirect(redirectUrl.toString());
  }
}
