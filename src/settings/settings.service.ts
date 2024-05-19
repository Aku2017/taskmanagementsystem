/* eslint-disable prettier/prettier */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { User, NotificationFrequency } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async updateNotificationFrequency(userId: string, frequency: NotificationFrequency): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { notificationFrequency: frequency },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update notification frequency');
    }
  }
}
