import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateGradeDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  grade: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
