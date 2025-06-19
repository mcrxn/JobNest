import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ) {
    const { contact, ...userData } = dto;
    if (userData.hash !== undefined) {
      userData.hash = await argon.hash(
        userData.hash,
      );
    }
    const user =
      await this.prisma.user.findUnique({
        where: { id: userId },
        select: { contactId: true },
      });

    if (!user) throw new Error('User not found');

    if (contact && user.contactId) {
      await this.prisma.contact.update({
        where: { id: user.contactId },
        data: contact,
      });
    }

    const updatedUser =
      await this.prisma.user.update({
        where: { id: userId },
        data: userData,
        include: { contact: true },
      });

    const { hash, ...userWithoutHash } =
      updatedUser;
    return userWithoutHash;
  }
}
