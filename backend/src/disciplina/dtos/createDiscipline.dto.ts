import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDisciplineDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  professor_id: number;
}