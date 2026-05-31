import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskCriteriaDto } from './dto/create-task-criteria.dto';
import { UpdateTaskCriteriaDto } from './dto/update-task-criteria.dto';

@Injectable()
export class TaskCriteriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTaskCriteriaDto: CreateTaskCriteriaDto,
    createdById: number,
  ) {
    return await this.prisma.taskCriteria.create({
      data: {
        title: createTaskCriteriaDto.title,

        weight: createTaskCriteriaDto.weight,

        description:
          createTaskCriteriaDto.description,

        taskId: createTaskCriteriaDto.taskId,

        createdById,
      },
    });
  }

  async findByTask(taskId: number) {
    return await this.prisma.taskCriteria.findMany({
      where: {
        taskId,
      },

      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findById(id: number) {
    const criteria =
      await this.prisma.taskCriteria.findUnique({
        where: {
          id,
        },
      });

    if (!criteria) {
      throw new NotFoundException(
        'Critério não encontrado',
      );
    }

    return criteria;
  }

  async update(
    id: number,
    updateTaskCriteriaDto: UpdateTaskCriteriaDto,
  ) {
    await this.findById(id);

    return await this.prisma.taskCriteria.update({
      where: {
        id,
      },

      data: {
        ...updateTaskCriteriaDto,
      },
    });
  }

  async remove(id: number) {
    await this.findById(id);

    return await this.prisma.taskCriteria.delete({
      where: {
        id,
      },
    });
  }
}