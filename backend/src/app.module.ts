import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { UsersModule } from './modules/users/users.module'; 

import { AuthModule } from './modules/auth/auth.module';

import { TasksModule } from './modules/tasks/tasks.module';

import { TaskCriteriaModule } from './modules/task-criteria/task-criteria.module';

import { SubmissionsModule } from './modules/submissions/submissions.module';

import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TasksModule,
    TaskCriteriaModule,
    SubmissionsModule,
    AiModule,
  ],
})
export class AppModule {}