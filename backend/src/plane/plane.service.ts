import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from '../constants/error_messages';
import { Like, Repository } from 'typeorm';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { Plane } from './plane.entity';
import { PaginatedResponse } from 'src/typings';

@Injectable()
export class PlaneService {
  constructor(
    @InjectRepository(Plane)
    private planeRepository: Repository<Plane>,
  ) {}

  async create(
    data: CreatePlaneDto & { createdBy: { id: number } },
  ): Promise<Plane> {
    const result = await this.planeRepository.save(data);
    delete result.createdBy;
    return result;
  }

  async findOne(id: number): Promise<Plane> {
    const plane = await this.planeRepository.findOne({ id });
    if (!plane) throw new NotFoundException(ERROR_MESSAGE.PlaneNotFound);
    return plane;
  }

  async findAll(
    skip = 0,
    take = 9,
    search?: string,
  ): Promise<PaginatedResponse<Plane>> {
    const [results, total] = await this.planeRepository.findAndCount({
      where: search ? { name: Like(`%${search}%`) } : undefined,
      take,
      skip,
    });
    return {
      results,
      status: {
        offset: skip,
        total,
      },
    };
  }

  async update(id: number, data: UpdatePlaneDto): Promise<Plane> {
    // if we want to return the updated entity, there's no better way in TypeORM right now
    const toUpdate = await this.planeRepository.findOne({ id });
    if (!toUpdate) throw new NotFoundException(ERROR_MESSAGE.PlaneNotFound);
    const updated = Object.assign(toUpdate, data);
    return this.planeRepository.save(updated);
  }

  async delete(id: number): Promise<void> {
    await this.planeRepository.delete(id);
  }
}
