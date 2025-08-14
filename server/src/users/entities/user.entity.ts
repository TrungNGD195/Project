import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Mối quan hệ OneToMany - User có thể tạo nhiều công việc
  @OneToMany(() => Task, (task) => task.creator) // Giả sử Task có thuộc tính creator
  tasksCreated: Task[]; // Đảm bảo rằng tasksCreated là mảng các công việc đã tạo
}
