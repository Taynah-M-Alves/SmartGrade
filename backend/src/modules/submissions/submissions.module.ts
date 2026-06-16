import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

import { AiModule } from '../ai/ai.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [AiModule, ConfigModule, GamificationModule],

  controllers: [SubmissionsController],

  providers: [SubmissionsService],
})
export class SubmissionsModule {}