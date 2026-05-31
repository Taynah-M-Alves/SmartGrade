import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return await this.prisma.task.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        criteria: true,

        submissions: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        criteria: true,

        submissions: true,
      },
    });

    if (!task) {
      throw new NotFoundException(
        'Atividade não encontrada',
      );
    }

    return task;
  }

  async findByCode(code: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        code,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        criteria: true,
      },
    });

    if (!task) {
      throw new NotFoundException(
        'Atividade não encontrada',
      );
    }

    return task;
  }

  async create(
    createTaskDto: CreateTaskDto,
    userId: number,
  ) {
    const generatedCode = `SMART-${uuid()
      .substring(0, 6)
      .toUpperCase()}`;

    return await this.prisma.task.create({
      data: {
        title: createTaskDto.title,

        description:
          createTaskDto.description,

        code: generatedCode,

        deadline: new Date(
          createTaskDto.deadline,
        ),

        createdById: userId,
      },
    });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ) {
    await this.findById(id);

    return await this.prisma.task.update({
      where: {
        id,
      },

      data: {
        ...updateTaskDto,

        ...(updateTaskDto.deadline && {
          deadline: new Date(
            updateTaskDto.deadline,
          ),
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findById(id);

    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}