import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

const adminDoc = {
  id: 1,
  email: 'admin1@admin.com',
  password: '$2a$10$gGpCCwS5hIPZx5uagmcQHeNzUF6u37PpIDxSaz8V92Ij4q1RDkdKu',
  createdAt: new Date(),
  updatedAt: new Date(),
}; // TODO - use a fake object factory

describe('AdminService', () => {
  let service: AdminService;

  const mockAdminRepository = {
    findOne: jest.fn((email) =>
      Promise.resolve({
        email,
        ...adminDoc,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: getRepositoryToken(Admin), useValue: mockAdminRepository },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.findOneByEmail', () => {
    it('should return admin document', async () => {
      const result = await service.findOneByEmail(adminDoc.email);
      expect(result).toEqual(adminDoc);
    });
    it('should return undefined', async () => {
      jest
        .spyOn(mockAdminRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      const result = await service.findOneByEmail(adminDoc.email);
      expect(result).toEqual(undefined);
    });
  });
});
