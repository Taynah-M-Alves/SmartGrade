import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

import { RolesGuard } from '../auth/guard/roles.guard';

import { Roles } from '../auth/decorator/roles.decorator';

import { Role } from '../../../generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.usersService.findById(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.PROFESSOR)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(
      createUserDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(
      id,
      updateUserDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.usersService.remove(id);
  }
}