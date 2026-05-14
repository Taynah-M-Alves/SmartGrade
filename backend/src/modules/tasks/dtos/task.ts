import { IsString, IsNotEmpty, IsDateString, IsInt, IsOptional, Min, IsNumber } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  deadline!: string;

  @IsInt()
  createdById!: number;
}

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;
}

export class CreateParameterSubmissionDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  @Min(0)
  weight!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  taskId!: number;
}

