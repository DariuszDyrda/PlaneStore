import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({
    type: Order,
  })
  create(@Body() orderData: CreateOrderDto): Promise<Order> {
    return this.orderService.create(orderData);
  }
}
