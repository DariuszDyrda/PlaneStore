import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IdParams } from '../typings';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { Plane } from './plane.entity';
import { PlaneService } from './plane.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('plane')
@ApiTags('plane')
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    type: Plane,
  })
  @ApiUnauthorizedResponse()
  create(@Body() planeData: CreatePlaneDto): Promise<Plane> {
    return this.planeService.create(planeData);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Plane,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  findOne(@Param() params: IdParams): Promise<Plane> {
    return this.planeService.findOne(params.id);
  }

  @Get()
  @ApiOkResponse({
    type: [Plane],
  })
  @ApiUnauthorizedResponse()
  findAll(): Promise<Plane[]> {
    return this.planeService.findAll();
  }
}
