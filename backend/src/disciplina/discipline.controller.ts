// import { Body, Controller, Get, Post } from '@nestjs/common';
// // import { DisciplineService } from './discipline.service';
// import { CreateDisciplineDTO } from './dtos/createDiscipline.dto';
// // import { DisciplineEntity } from './interfaces/discipline.entity';
// import { UseGuards } from '@nestjs/common';

// @Controller('discipline')
// export class DisciplineController {
//   constructor(private readonly disciplineService: DisciplineService) {}

//   @Post()
//   async create(
//     @Body() data: CreateDisciplineDTO,
//   ): Promise<DisciplineEntity> {
//     return this.disciplineService.createDiscipline(data);
//   }
  
//   @Get()
//   async findAll(): Promise<DisciplineEntity[]> {
//     return this.disciplineService.getAllDisciplines();
//   }
// }