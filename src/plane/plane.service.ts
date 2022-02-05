import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/constants/error_messages';
import { Repository } from 'typeorm';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { Plane } from './plane.entity';

@Injectable()
export class PlaneService {
  constructor(
    @InjectRepository(Plane)
    private planeRepository: Repository<Plane>,
  ) {}

  async create(data: CreatePlaneDto): Promise<Plane> {
    return this.planeRepository.save(data);
  }

  async findOne(id: number): Promise<Plane> {
    const plane = await this.planeRepository.findOne({ id });
    if (!plane) throw new NotFoundException(ERROR_MESSAGE.PlaneNotFound);
    return plane;
  }

  async findAll(): Promise<Plane[]> {
    return this.planeRepository.find({});
  }
}
