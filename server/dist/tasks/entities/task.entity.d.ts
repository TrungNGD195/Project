import { User } from '../../users/entities/user.entity';
export declare class Task {
    id: string;
    title: string;
    details?: string;
    creator: User;
}
