import { IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';

type typeUser = "aluno" | "professor";

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  cpf: string;

  @MinLength(6)
  password: string;

  phone: string;

  @IsEnum(['aluno', 'professor'])
  type: typeUser;
}