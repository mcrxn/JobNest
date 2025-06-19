import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContactDto } from 'src/common/dtos/contact.dto';
import { ListingDto } from 'src/common/dtos/listing.dto';
import { ReviewDto } from 'src/common/dtos/review.dto';

export class ProfileDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @IsString()
  shortBio: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ListingDto)
  listings?: ListingDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ListingDto)
  applications?: ListingDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviewsRecieved?: ReviewDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviewsGiven?: ReviewDto[];
}
