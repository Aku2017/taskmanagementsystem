/* eslint-disable prettier/prettier */


import { IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationFrequency } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationFrequencyDto {
   @ApiProperty({ description: 'The name of the user' })
@IsNotEmpty()
  @IsEnum(NotificationFrequency)
  frequency: NotificationFrequency;
}
