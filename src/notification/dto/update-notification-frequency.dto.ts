/* eslint-disable prettier/prettier */


import { IsEnum } from 'class-validator';
import { NotificationFrequency } from '@prisma/client';

export class UpdateNotificationFrequencyDto {
  @IsEnum(NotificationFrequency)
  frequency: NotificationFrequency;
}
