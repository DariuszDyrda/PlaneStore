import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '../admin/admin.entity';

export class LoginResponse {
  @ApiProperty({ type: () => Admin })
  user: AdminWithoutPassword;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export type AdminWithoutPassword = Omit<Admin, 'password'>;
