import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderService } from './order.service';
import { Plane } from '../plane/plane.entity';

const planeData = {
  id: 1,
  name: 'Airbus A380',
  description: 'The biggest passenger plane on the planet',
  photoUrl: 'https://planes.com/photos/airbus-a380.png',
  createdById: 1,
};

const orderData = {
  id: 1,
  clientName: 'Jan Kowalski',
  clientAddress: 'ul. Pocztowa 1, 00-001 Warszawa',
  planeId: planeData.id,
  status: OrderStatus.Pending,
};

const now = new Date();

describe('OrderService', () => {
  let service: OrderService;
  let mockPlaneRepo;
  let mockOrderRepo;

  beforeEach(async () => {
    mockOrderRepo = {
      save: jest.fn((data) =>
        Promise.resolve({
          id: data.id || 1,
          ...orderData,
          ...data,
          createdAt: now,
          updatedAt: now,
        }),
      ),
      findOne: jest.fn((data) =>
        Promise.resolve({
          ...orderData,
          planeId: undefined,
          plane: planeData,
          ...data,
        }),
      ),
      find: jest.fn((data) =>
        Promise.resolve([
          {
            ...orderData,
            ...data,
          },
        ]),
      ),
    };

    mockPlaneRepo = {
      findOne: jest.fn((data) =>
        Promise.resolve({
          ...planeData,
          ...data,
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepo },
        { provide: getRepositoryToken(Plane), useValue: mockPlaneRepo },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.create', () => {
    it('should create an order document', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...data } = orderData;
      const result = await service.create(data);
      expect(result).toEqual({
        ...orderData,
        createdAt: now,
        updatedAt: now,
      });
    });
  });

  describe('.update', () => {
    it('should return updated order document', async () => {
      const updatedAt = new Date();
      jest.spyOn(mockOrderRepo, 'save').mockImplementation((data: object) =>
        Promise.resolve({
          ...data,
          planeId: undefined,
          plane: planeData,
          updatedAt,
        }),
      );
      const newData = { clientName: 'Joe Doe' };
      const result = await service.update(orderData.id, newData);
      expect(result).toEqual({
        id: orderData.id,
        ...orderData,
        planeId: undefined,
        plane: planeData,
        ...newData,
        updatedAt,
      });
    });
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(mockOrderRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      const newData = { clientAddress: 'New address' };
      await expect(service.update(2, newData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('.findOne', () => {
    it('should return order document', async () => {
      const result = await service.findOne(orderData.id);
      expect(result).toEqual({
        ...orderData,
        planeId: undefined,
        plane: planeData,
      });
    });
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(mockOrderRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('.findAll', () => {
    it('should return array of order documents', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });
    it('should return empty array', async () => {
      jest
        .spyOn(mockOrderRepo, 'find')
        .mockImplementation(() => Promise.resolve([]));
      const result = await service.findAll();
      expect(result).toHaveLength(0);
    });
  });
});
