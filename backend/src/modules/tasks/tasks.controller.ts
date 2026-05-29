import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import {
  CreateParameterSubmissionDTO,
  CreateTaskDTO,
  UpdateTaskDTO,
} from './dtos/task';
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

  @Get('getTasks')
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }

  @Put(':id/updateTask')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
    return await this.tasksService.updateTask(id, body);
  }
}
