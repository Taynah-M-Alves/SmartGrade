import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisciplineEntity } from './interfaces/discipline.entity';
import { UserEntity } from '../user/interfaces/user.entity';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEntity, UserEntity])],
  providers: [DisciplineService],
  controllers: [DisciplineController],
  exports: [DisciplineService],
})
export class DisciplineModule {}