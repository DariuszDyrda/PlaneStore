import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

const adminDoc = {
  id: 1,
  email: 'admin1@admin.com',
  password: '$2a$10$gGpCCwS5hIPZx5uagmcQHeNzUF6u37PpIDxSaz8V92Ij4q1RDkdKu',
  createdAt: new Date(),
  updatedAt: new Date(),
}; // TODO - use a fake object factory

const FAKE_JWT_TOKEN = 'ThisIsJWTToken';

describe('AuthService', () => {
  let service: AuthService;
  let adminService: AdminService;

  const mockAdminService = {
    findOneByEmail: jest.fn((email) =>
      Promise.resolve({
        email,
        ...adminDoc,
      }),
    ),
  };
  const mockJwtService = {
    sign: jest.fn(() => FAKE_JWT_TOKEN),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, AdminService, JwtService, ConfigService],
    })
      .overrideProvider(AdminService)
      .useValue(mockAdminService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.validateAdmin', () => {
    it('should return admin doc without password', async () => {
      const result = await service.validateAdmin(adminDoc.email, 'admin123');

      expect(result).toEqual({
        ...adminDoc,
        password: undefined,
      });
    });
    it('should throw UnauthorizedException when wrong password', async () => {
      await expect(
        service.validateAdmin(adminDoc.email, 'wrongPass'),
      ).rejects.toThrow(UnauthorizedException);
    });
    it('should throw UnauthorizedException when no user in database', async () => {
      jest
        .spyOn(adminService, 'findOneByEmail')
        .mockImplementation(() => Promise.resolve(undefined));
      await expect(
        service.validateAdmin(adminDoc.email, 'admin123'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('.login', () => {
    it('should return passed admin doc with auth tokens', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userDoc } = adminDoc;
      const result = await service.login(userDoc);
      expect(result).toEqual({
        user: userDoc,
        accessToken: FAKE_JWT_TOKEN,
        refreshToken: FAKE_JWT_TOKEN,
      });
    });
  });
});
