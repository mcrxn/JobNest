import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { log } from 'console';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Put('me')
  updateUser(
    @Body() dto: UpdateUserDto,
    @GetUser('id') userId: number,
  ) {
    return this.userService.updateUser(
      userId,
      dto,
    );
  }
}
