import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule, ConfigModule],

  controllers: [SubmissionsController],

  providers: [SubmissionsService],
})
export class SubmissionsModule {}