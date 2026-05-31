import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Prisma } from '../../../generated/prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado',
      );
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        10,
      );

      return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
          role: createUserDto.role,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'E-mail já cadastrado',
        );
      }

      throw error;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {
    await this.findById(id);

    try {
      const data: UpdateUserDto = {
        ...updateUserDto,
      };

      if (updateUserDto.password) {
        data.password = await bcrypt.hash(
          updateUserDto.password,
          10,
        );
      }

      return await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'E-mail já cadastrado',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findById(id);

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}