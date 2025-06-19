import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  socialMedia?: string;
}
