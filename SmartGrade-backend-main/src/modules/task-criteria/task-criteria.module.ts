import { Module } from '@nestjs/common';

import { TaskCriteriaController } from './task-criteria.controller';
import { TaskCriteriaService } from './task-criteria.service';

@Module({
  controllers: [TaskCriteriaController],
  providers: [TaskCriteriaService],
})
export class TaskCriteriaModule {}