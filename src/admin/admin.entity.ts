import { Plane } from '../plane/plane.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity()
export class Admin {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Plane, (plane) => plane.createdBy)
  planes: Plane[];
}
