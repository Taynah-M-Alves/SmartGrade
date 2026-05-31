import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../../../generated/prisma/client';

export class LoginUserDto {
  email: string;
  password: string;
}