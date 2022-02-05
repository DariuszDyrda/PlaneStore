import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaneController } from './plane.controller';
import { Plane } from './plane.entity';
import { PlaneService } from './plane.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plane])],
  controllers: [PlaneController],
  providers: [PlaneService],
})
export class PlaneModule {}
