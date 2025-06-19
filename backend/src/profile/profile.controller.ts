import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ProfileService } from './profile.service';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
  ) {}
  @Get(':userId')
  async getProfile(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.profileService.getProfile(userId);
  }
}
