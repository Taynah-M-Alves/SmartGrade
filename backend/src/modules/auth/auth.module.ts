import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
=======
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constants';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
>>>>>>> 9e6028bf3fc03ed64d4819a32ffd0ed2d89513de
})
export class AuthModule {}
