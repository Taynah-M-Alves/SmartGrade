import { Controller, Post, Body } from '@nestjs/common';
import { CreateParameterSubmissionDTO, CreateTaskDTO } from './dtos/task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
    
    @Post('createTask')
    async createTask(@Body() body: CreateTaskDTO) {
        return await this.tasksService.createTask(body);
    }

    @Post('createParameter')
    async createParameter(@Body() body: CreateParameterSubmissionDTO) {
        return await this.tasksService.createParameter(body);
    }
}
