import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateParameterSubmissionDTO,
  CreateTaskDTO,
  UpdateTaskDTO,
} from './dtos/task';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async createTask(data: CreateTaskDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: data.createdById,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const task = await this.prismaService.task.create({
      data: {
        ...data,
        deadline: new Date(data.deadline),
        createdById: data.createdById,
      },
    });

    return task;
  }

  async createParameter(data: CreateParameterSubmissionDTO) {
    const task = await this.prismaService.task.findUnique({
      where: { id: data.taskId },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const parameter = await this.prismaService.parameterSubmission.create({
      data: {
        ...data,
        taskId: data.taskId,
      },
    });
    return parameter;
  }

  async getAllTasks() {
    const tasks = await this.prismaService.task.findMany({
      select: {
        id: true,
        title: true,
        createdBy: true,
        createdAt: true,
        description: true,
        deadline: true,
        parameters: true,
        submissions: true,
      },
    });
    return tasks;
  }

  async updateTask(idTask: string, data: UpdateTaskDTO) {
    const foundTask = await this.prismaService.task.findFirst({
      where: { id: Number(idTask) },
    });

    if (!foundTask) {
      throw new NotFoundException('Task não encontrada');
    }

    const updatedTast = await this.prismaService.task.update({
      where: {
        id: Number(idTask),
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.deadline && { deadline: data.deadline }),
      },
    });
    return updatedTast;
  }
}
