/* eslint-disable prettier/prettier */
//import { Prisma } from '@prisma/client';

export enum NotificationFrequency {
   
DAILY,
BI_WEEKLY,
HOURLY,
SYSTEM_DEFAULT

}

export class Notification{

    frequency: NotificationFrequency
}