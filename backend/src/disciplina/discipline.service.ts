// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { DisciplineEntity } from './interfaces/discipline.entity';
// import { CreateDisciplineDTO } from './dtos/createDiscipline.dto';

// @Injectable()
// export class DisciplineService {
//   constructor(
//     @InjectRepository(DisciplineEntity)
//     private readonly disciplineRepository: Repository<DisciplineEntity>,
//   ) {}


//   async createDiscipline(data: CreateDisciplineDTO): Promise<> {
//     const { name, professor_id } = data;




//   }


//   async getAllDisciplines(): Promise<DisciplineEntity[]> {
//     return await this.disciplineRepository.find({
//       relations: ['professor'], // 🔥 traz dados do professor
//     });
//   }

//   async getDisciplineById(id: number): Promise<DisciplineEntity> {
//     const discipline = await this.disciplineRepository.findOne({
//       where: { id },
//       relations: ['professor'],
//     });

//     if (!discipline) {
//       throw new NotFoundException('Disciplina não encontrada');
//     }

//     return discipline;
//   }

//   async deleteDiscipline(id: number): Promise<void> {
//     const discipline = await this.getDisciplineById(id);

//     await this.disciplineRepository.remove(discipline);
//   }
// }