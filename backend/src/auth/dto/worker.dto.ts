import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class WorkerDataDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  portfolioLink: string;

  @IsString()
  cvUrl: string;

  @IsInt()
  industryId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tasksDoneIds?: number[];
}
