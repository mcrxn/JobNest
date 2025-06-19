import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContactDto } from './contact.dto';

export class UserDto {
  @IsInt()
  id: number;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  shortBio?: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
