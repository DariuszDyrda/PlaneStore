import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plane } from './plane.entity';
import { PlaneService } from './plane.service';

const planeData = {
  id: 1,
  name: 'Airbus A380',
  description: 'The biggest passenger plane on the planet',
  photoUrl: 'https://planes.com/photos/airbus-a380.png',
  createdById: 1,
};

const now = new Date();

describe('PlaneService', () => {
  let service: PlaneService;
  let mockPlaneRepo;

  beforeEach(async () => {
    mockPlaneRepo = {
      save: jest.fn((data) =>
        Promise.resolve({
          id: data.id || 1,
          ...planeData,
          ...data,
          createdAt: now,
          updatedAt: now,
        }),
      ),
      findOne: jest.fn((data) =>
        Promise.resolve({
          ...planeData,
          ...data,
        }),
      ),
      findAndCount: jest.fn((data) =>
        Promise.resolve([[{ ...planeData, ...data }], 1]),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaneService,
        { provide: getRepositoryToken(Plane), useValue: mockPlaneRepo },
      ],
    }).compile();

    service = module.get<PlaneService>(PlaneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.create', () => {
    it('should create a plane document', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...data } = planeData;
      const result = await service.create({ ...data, createdBy: { id: 1 } });
      expect(result).toEqual({
        ...planeData,
        createdAt: now,
        updatedAt: now,
      });
    });
  });

  describe('.update', () => {
    it('should return updated plane document', async () => {
      const updatedAt = new Date();
      jest.spyOn(mockPlaneRepo, 'save').mockImplementation((data: object) =>
        Promise.resolve({
          ...data,
          updatedAt,
        }),
      );
      const newData = { name: 'New name' };
      const result = await service.update(planeData.id, newData);
      expect(result).toEqual({
        id: planeData.id,
        ...planeData,
        ...newData,
        updatedAt,
      });
    });
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(mockPlaneRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      const newData = { name: 'New name' };
      await expect(service.update(2, newData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('.findOne', () => {
    it('should return plane document', async () => {
      const result = await service.findOne(planeData.id);
      expect(result).toEqual(planeData);
    });
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(mockPlaneRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('.findAll', () => {
    it('should return paginated response', async () => {
      const result = await service.findAll();
      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('status');
    });
    it('should return array of plane documents', async () => {
      const result = await service.findAll();
      expect(result.results).toHaveLength(1);
    });
    it('should return empty array', async () => {
      jest
        .spyOn(mockPlaneRepo, 'findAndCount')
        .mockImplementation(() => Promise.resolve([[], 0]));
      const result = await service.findAll();
      expect(result.results).toHaveLength(0);
      expect(result.status.total).toEqual(0);
    });
  });
});
