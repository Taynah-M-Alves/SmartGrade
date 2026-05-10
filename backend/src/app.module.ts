import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineService } from './disciplina/discipline.service';
import { DisciplineModule } from './disciplina/discipline.module';
import { DisciplineController } from './disciplina/discipline.controller';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      migrations: [`${__dirname}/migration/*.{ts,js}`],
      migrationsRun: true,
    }),

    UserModule,

    DisciplineModule,

    UploadModule,

    AuthModule,
  ],
  controllers: [DisciplineController],
  providers: [],
})
export class AppModule {}
