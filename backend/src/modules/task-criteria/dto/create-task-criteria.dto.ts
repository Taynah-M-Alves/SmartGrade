import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateTaskCriteriaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1)
  weight: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  taskId: number;
}