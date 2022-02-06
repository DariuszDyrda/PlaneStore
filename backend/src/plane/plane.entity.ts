import { Admin } from '../admin/admin.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeUpdate,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Plane {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  photoUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @RelationId((plane: Plane) => plane.createdBy)
  createdById: number;

  @ApiHideProperty()
  @ManyToOne(() => Admin, (admin) => admin.id)
  createdBy: Admin;

  @ApiHideProperty()
  @OneToMany(() => Order, (order) => order.id)
  orders: Order[];

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
