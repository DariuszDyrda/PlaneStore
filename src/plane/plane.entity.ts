import { Admin } from '../admin/admin.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeUpdate,
  ManyToOne,
  RelationId,
} from 'typeorm';

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
  photoUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @RelationId((plane: Plane) => plane.createdBy)
  createdById: number;

  @ManyToOne(() => Admin, (admin) => admin.id)
  createdBy: Admin;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
