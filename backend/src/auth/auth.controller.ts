import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseSignUpDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { UserType } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { WorkerDataDto } from './dto/worker.dto';
import { FirmDataDto } from './dto/firm.dto';
import { HirerDataDto } from './dto/hirer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: BaseSignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('create-profile')
  @UseGuards(AuthGuard('jwt'))
  createUserProfile(
    @Body()
    dto:
      | WorkerDataDto
      | FirmDataDto
      | HirerDataDto,
    @Req() req: Request,
  ) {
    const user = req.user as {
      id: number;
      userType: UserType;
    };
    return this.authService.createUserProfile(
      user.id,
      dto,
      user.userType,
    );
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
