import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateTaskCriteriaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  weight?: number;

  @IsOptional()
  @IsString()
  description?: string;
}