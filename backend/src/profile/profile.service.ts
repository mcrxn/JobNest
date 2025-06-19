import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user =
      await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          hash: false,
          shortBio: true,
          userType: true,
          contactId: true,
          contact: true,
          listings: true,
          applications: true,
          reviewsGiven: true,
          Review: true,
          worker: true,
          hirer: true,
          girm: true,
        },
      });
    return user;
  }
}
