import { IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  phoneNumber: string;
  @IsString()
  socialMedia: string;
}
