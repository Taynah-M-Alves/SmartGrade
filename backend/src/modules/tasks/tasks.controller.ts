import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { Role } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  // PUBLICA
  @Get('/code/:code')
  async findByCode(
    @Param('code') code: string,
  ) {
    return await this.tasksService.findByCode(
      code,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.tasksService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Post()
  async create(
    @Body()
    createTaskDto: CreateTaskDto,

    @Req()
    req: Request & {
      user: { id: number };
    },
  ) {
    return await this.tasksService.create(
      createTaskDto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.update(
      id,
      updateTaskDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.tasksService.remove(id);
  }
}