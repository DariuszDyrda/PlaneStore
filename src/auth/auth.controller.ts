import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminWithoutPassword, LoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginBody } from './dto/login.dto';
import { JwtRefreshAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Return admin document, access and refresh tokens',
    type: LoginResponse,
  })
  @ApiBody({ type: LoginBody })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user as AdminWithoutPassword);
  }

  @ApiResponse({
    status: 201,
    description: 'Return admin document, access and refresh tokens',
    type: LoginResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refresh(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }
}
