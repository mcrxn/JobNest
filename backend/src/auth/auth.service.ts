import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseSignUpDto } from './dto';
import * as argon from 'argon2';
import { Prisma, UserType } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserProfileDto } from './dto/user-profile.dto';
import { log } from 'console';
import { WorkerDataDto } from './dto/worker.dto';
import { FirmDataDto } from './dto/firm.dto';
import { HirerDataDto } from './dto/hirer.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: BaseSignUpDto) {
    const hash = await argon.hash(dto.password);
    const {
      email,
      userType,
      phoneNumber,
      socialMedia,
      shortBio,
    } = dto;
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          userType,
          hash,
          shortBio,
          contact: {
            create: {
              phoneNumber,
              socialMedia,
            },
          },
        },
      });
      return this.signToken(
        user.id,
        user.email,
        user.userType,
      );
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError
      ) {
        console.log();
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Creds taken',
          );
        }
      }
      throw error;
    }
  }

  async createUserProfile(
    userId: number,
    dto:
      | WorkerDataDto
      | FirmDataDto
      | HirerDataDto,
    userType: UserType,
  ) {
    log('Service ', dto);
    switch (userType) {
      case 'WORKER':
        return this.prisma.worker.create({
          data: {
            ...(dto as WorkerDataDto),
            userId,
          },
        });
      case 'FIRM':
        return this.prisma.firm.create({
          data: {
            ...(dto as FirmDataDto),
            userId,
          },
        });
      case 'HIRER':
        return this.prisma.hirer.create({
          data: {
            ...(dto as HirerDataDto),
            userId,
          },
        });
      default:
        throw new Error(`Unsupported user type`);
    }
  }

  async login(dto: LoginDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    const pw = await argon.verify(
      user.hash,
      dto.password,
    );
    if (!pw)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    return this.loginToken(user.id, user.email);
  }

  async loginToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '3h',
        secret: secret,
      },
    );
    return {
      access_token: token,
    };
  }
  async signToken(
    userId: number,
    email: string,
    userType: UserType,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      email,
      userType,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '3h',
        secret: secret,
      },
    );
    return {
      access_token: token,
    };
  }
}
