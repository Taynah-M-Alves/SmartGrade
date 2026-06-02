import { Module } from '@nestjs/common';

import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],

  controllers: [SubmissionsController],

  providers: [SubmissionsService],
})
export class SubmissionsModule {}