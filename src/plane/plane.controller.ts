import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { Plane } from './plane.entity';
import { PlaneService } from './plane.service';

@Controller('plane')
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() planeData: CreatePlaneDto): Promise<Plane> {
    return this.planeService.create(planeData);
  }
}
