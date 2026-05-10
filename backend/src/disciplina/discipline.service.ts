import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisciplineEntity } from './interfaces/discipline.entity';
import { UserEntity } from '../user/interfaces/user.entity';
import { CreateDisciplineDTO } from './dtos/createDiscipline.dto';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository: Repository<DisciplineEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}


  async createDiscipline(data: CreateDisciplineDTO): Promise<DisciplineEntity> {
    const { name, professor_id } = data;

    const professor = await this.userRepository.findOne({
      where: { id: professor_id },
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    if (professor.type !== 'professor') {
      throw new BadRequestException('O usuário informado não é um professor');
    }

    const discipline = this.disciplineRepository.create({
      name,
      professor,
    });

    return await this.disciplineRepository.save(discipline);
  }


  async getAllDisciplines(): Promise<DisciplineEntity[]> {
    return await this.disciplineRepository.find({
      relations: ['professor'], // 🔥 traz dados do professor
    });
  }

  async getDisciplineById(id: number): Promise<DisciplineEntity> {
    const discipline = await this.disciplineRepository.findOne({
      where: { id },
      relations: ['professor'],
    });

    if (!discipline) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    return discipline;
  }

  async deleteDiscipline(id: number): Promise<void> {
    const discipline = await this.getDisciplineById(id);

    await this.disciplineRepository.remove(discipline);
  }
}