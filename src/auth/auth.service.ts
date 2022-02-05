import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcryptjs';
import { AdminWithoutPassword } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private adminService: AdminService,
  ) {}

  async validateAdmin(
    email: string,
    pass: string,
  ): Promise<AdminWithoutPassword> {
    const admin = await this.adminService.findOneByEmail(email);
    if (!admin) throw new UnauthorizedException();
    const doesPasswordMatch = await bcrypt.compare(pass, admin.password);
    if (!doesPasswordMatch) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = admin;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, isAccessToken: true };
    return {
      user,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn'),
      }),
      refreshToken: this.jwtService.sign(
        { ...payload, isAccessToken: false },
        {
          expiresIn: this.configService.get<string>(
            'jwt.refreshTokenExpiresIn',
          ),
        },
      ),
    };
  }
}
