import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHideProperty,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Plane } from 'src/plane/plane.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IdParams } from '../typings';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

class OrderWithPlane extends Order {
  @ApiProperty({ type: Plane })
  plane: Plane;
  @ApiHideProperty()
  planeId: number;
}

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOkResponse({
    type: OrderWithPlane,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  findOne(@Param() params: IdParams): Promise<Order> {
    return this.orderService.findOne(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    type: [Order],
  })
  @ApiUnauthorizedResponse()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  remove(@Param() params: IdParams): Promise<void> {
    return this.orderService.delete(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOkResponse({
    type: OrderWithPlane,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  update(
    @Param() params: IdParams,
    @Body() orderData: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(params.id, orderData);
  }
}
