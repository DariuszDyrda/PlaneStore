import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IdParams } from '../typings';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { Plane } from './plane.entity';
import { PlaneService } from './plane.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdatePlaneDto } from './dto/update-plane.dto';

@Controller('plane')
@ApiTags('plane')
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    type: Plane,
  })
  @ApiUnauthorizedResponse()
  create(@Req() req, @Body() planeData: CreatePlaneDto): Promise<Plane> {
    return this.planeService.create({
      ...planeData,
      createdBy: { id: req.user.id },
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOkResponse({
    type: Plane,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  update(
    @Param() params: IdParams,
    @Body() planeData: UpdatePlaneDto,
  ): Promise<Plane> {
    return this.planeService.update(params.id, planeData);
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  remove(@Param() params: IdParams): Promise<void> {
    return this.planeService.delete(params.id);
  }
}
