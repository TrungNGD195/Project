import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  details?: string;

  // Mối quan hệ ManyToOne - Mỗi công việc có một người tạo
  @ManyToOne(() => User, (user) => user.tasksCreated)
  creator: User; // Thuộc tính creator liên kết đến người tạo công việc
}
