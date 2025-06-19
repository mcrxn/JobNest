import { IsInt, IsString } from 'class-validator';

export class FirmDataDto {
  @IsString()
  name: string;

  @IsString()
  website: string;

  @IsInt()
  industryId: number;
}
