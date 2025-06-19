import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';

export class ReviewDto {
  @IsInt()
  id: number;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @IsNumber()
  grade: number;

  @IsString()
  comment: string;

  @IsInt()
  posterId: number;

  @IsInt()
  recieverId: number;
}
