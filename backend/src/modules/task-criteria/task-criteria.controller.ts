import {
  Body,
  Req,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Role } from '@prisma/client';

import { Roles } from '../auth/decorators/roles.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { TaskCriteriaService } from './task-criteria.service';

import { CreateTaskCriteriaDto } from './dto/create-task-criteria.dto';
import { UpdateTaskCriteriaDto } from './dto/update-task-criteria.dto';

@Controller('task-criteria')
export class TaskCriteriaController {
  constructor(
    private readonly taskCriteriaService: TaskCriteriaService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Post()
  async create(
    @Body()
    createTaskCriteriaDto: CreateTaskCriteriaDto,
    @Req() req, 
  ) {
    return await this.taskCriteriaService.create(
      createTaskCriteriaDto,
      req.user.id
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/task/:taskId')
  async findByTask(
    @Param('taskId', ParseIntPipe)
    taskId: number,
  ) {
    return await this.taskCriteriaService.findByTask(
      taskId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateTaskCriteriaDto: UpdateTaskCriteriaDto,
  ) {
    return await this.taskCriteriaService.update(
      id,
      updateTaskCriteriaDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.taskCriteriaService.remove(
      id,
    );
  }
}