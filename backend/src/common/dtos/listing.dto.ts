import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from './user.dto';

export class ListingDto {
  @IsString()
  title: string;

  @IsString()
  compensation: String;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsInt()
  industryId: number;

  @IsString()
  jobPosition: string;

  @IsInt()
  posterId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  applicants: UserDto[];

  @IsOptional()
  @IsInt()
  workerId: number;
}
