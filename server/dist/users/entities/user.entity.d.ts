import { Task } from '../../tasks/entities/task.entity';
export declare class User {
    id: string;
    full_name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    tasksCreated: Task[];
}
