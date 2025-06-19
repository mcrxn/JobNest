import { IsString } from 'class-validator';

export class HirerDataDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;
}
