import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/constants/error_messages';
import { Plane } from 'src/plane/plane.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
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
}
