import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/constants/error_messages';
import { Plane } from 'src/plane/plane.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Plane)
    private planeRepository: Repository<Plane>,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const plane = await this.planeRepository.findOne(data.planeId);
    if (!plane) throw new NotFoundException(ERROR_MESSAGE.PlaneNotFound);
    const result = await this.orderRepository.save({ ...data, plane });
    delete result.plane;
    return result;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(
      { id },
      { relations: ['plane'] },
    );
    if (!order) throw new NotFoundException(ERROR_MESSAGE.OrderNotFound);
    delete order.planeId;
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({});
  }

  async update(
    id: number,
    data: UpdateOrderDto & { plane?: Plane },
  ): Promise<Order> {
    // if we want to return the updated entity, there's no better way in TypeORM right now
    const toUpdate = await this.orderRepository.findOne(
      { id },
      { relations: ['plane'] },
    );
    if (!toUpdate) throw new NotFoundException(ERROR_MESSAGE.OrderNotFound);
    const updateData = { ...data };
    if (data.planeId) {
      updateData.plane = await this.planeRepository.findOne(data.planeId);
      if (!updateData.plane)
        throw new NotFoundException(ERROR_MESSAGE.PlaneNotFound);
      delete updateData.planeId;
    }
    const updated = Object.assign(toUpdate, updateData);
    const result = await this.orderRepository.save(updated);
    delete result.planeId;
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
