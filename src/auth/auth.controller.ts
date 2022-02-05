import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AdminWithoutPassword, LoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user as AdminWithoutPassword);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refresh(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }
}
