import {
  IsEmail,
  IsString,
} from 'class-validator';

export class JwtDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
