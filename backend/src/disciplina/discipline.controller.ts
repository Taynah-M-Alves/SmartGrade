import { Body, Controller, Get, Post } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDTO } from './dtos/createDiscipline.dto';
import { DisciplineEntity } from './interfaces/discipline.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../user/guards/roles.guard';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { Roles } from '../user/decorators/roles.decorator';

@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('professor')
  async create(
    @Body() data: CreateDisciplineDTO,
  ): Promise<DisciplineEntity> {
    return this.disciplineService.createDiscipline(data);
  }
  
  @Get()
  async findAll(): Promise<DisciplineEntity[]> {
    return this.disciplineService.getAllDisciplines();
  }
}