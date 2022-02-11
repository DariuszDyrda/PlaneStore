import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeUpdate,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Plane } from '../plane/plane.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

@Entity()
export class Order {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  clientAddress: string;

  @Column({ default: OrderStatus.Pending })
  status: OrderStatus;

  @RelationId((order: Order) => order.plane)
  planeId: number;

  @ApiHideProperty()
  @ManyToOne(() => Plane, (plane) => plane.id, {
    onDelete: 'SET NULL',
  })
  plane: Plane;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
