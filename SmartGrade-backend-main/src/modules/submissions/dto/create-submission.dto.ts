import { Type } from 'class-transformer';

import {
  IsNumber,
} from 'class-validator';

export class CreateSubmissionDto {
  @Type(() => Number)
  @IsNumber()
  taskId: number;

  @Type(() => Number)
  @IsNumber()
  userId: number;
}