/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [NotificationService],
})
export class SettingsModule {}