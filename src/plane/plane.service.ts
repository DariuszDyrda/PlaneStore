import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
