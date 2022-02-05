import { Admin } from '../admin/admin.entity';

export class LoginResponse {
  user: AdminWithoutPassword;
  accessToken: string;
  refreshToken: string;
}

export type AdminWithoutPassword = Omit<Admin, 'password'>;
