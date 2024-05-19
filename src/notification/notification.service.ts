/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Cron, CronExpression } from '@nestjs/schedule';
//import { NotificationFrequency} from 'src/notification/notification.model'
import { Task, User, NotificationFrequency } from '@prisma/client';
import * as nodemailer from 'nodemailer'

@Injectable()
export class NotificationService {
    constructor(private readonly prisma: PrismaService) { }

async setNotificationFrequency(userId: string, frequency: NotificationFrequency) {
    return this.prisma.user.update({
      where: { id: userId},
        data: { notificationFrequency: frequency }
      
    });
  }

async getNotificationFrequency(userId: string): Promise<NotificationFrequency> {
const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { notificationFrequency: true },
    });

    return user.notificationFrequency;
    }
    
    async processandSendNotifications(frequency: NotificationFrequency, isEmail: boolean) {
        const users = await this.prisma.user.findMany({
            include: { tasks: true },
        });

          for (const user of users) {
          const userFrequency = user.notificationFrequency || NotificationFrequency.SYSTEM_DEFAULT;
        for (const task of user.tasks) {
          const remainingDays = this.calculateDaysLeftForTaskCompletion(task.endDate);
          
            if (remainingDays !== null)
            {
                if (userFrequency === frequency || userFrequency === NotificationFrequency.SYSTEM_DEFAULT) 
                if (isEmail)
                {
                    await this.sendNotificationToUserMail(user, task, remainingDays);
                }
                await this.sendNotificationToApp(user, task, remainingDays);
            }
       
      }
    }
    }
    
    private async sendNotificationToApp(user: User, task: Task, remainingDays: number) {
    const text = `Hello ${user.name},\n\nThis is a reminder that your task "${task.title}" is due in ${remainingDays} days.\n\nBest regards,\nTask Management Team`;
        console.log(`Notification sent to user about task "${task.title}"` + 'with the following information' + text);
    }
        //here i am implementing a functin that calculates the days left for the task to be completed
 private async sendNotificationToUserMail(user: User, task: Task, remainingDays: number) {
    const subject = `Reminder: Task "${task.title}" is due in ${remainingDays} days`;
    const text = `Hello ${user.name},\n\nThis is a reminder that your task "${task.title}" is due in ${remainingDays} days.\n\nBest regards,\nTask Management Team`;

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Notification sent to ${user.email} about task "${task.title}"`);
    } catch (error) {
      console.error(`Failed to send notification to ${user.email}: ${error.message}`);
    }
  }
    
   private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
   });
  
    
/*private async processNotifications(frequency: NotificationFrequency) {
        
    }*/

private calculateDaysLeftForTaskCompletion(endDate: Date): number{
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));

    }    
    
    //I am using a scheduler called cron, to send the notfications:

     @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleDailyNotifications() {
    await this.processandSendNotifications(NotificationFrequency.DAILY);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleBiWeeklyNotifications() {
    await this.processandSendNotifications(NotificationFrequency.BI_WEEKLY);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyNotifications() {
    await this.processandSendNotifications(NotificationFrequency.HOURLY);
  }
    
}