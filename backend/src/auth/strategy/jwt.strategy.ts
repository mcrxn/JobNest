import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')!,
    });
  }
  async validate(payload: {
    id: number;
    email: string;
    userType: 'WORKER' | 'HIRER' | 'FIRM';
  }) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
