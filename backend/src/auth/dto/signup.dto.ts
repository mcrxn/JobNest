import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class BaseSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsString()
  shortBio?: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  socialMedia: string;
}
