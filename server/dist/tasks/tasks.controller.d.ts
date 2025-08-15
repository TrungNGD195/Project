import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasks;
    constructor(tasks: TasksService);
    create(dto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    findAll(): Promise<import("./entities/task.entity").Task[]>;
    findOne(id: string): Promise<import("./entities/task.entity").Task>;
    update(id: string, dto: UpdateTaskDto): Promise<import("./entities/task.entity").Task>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
