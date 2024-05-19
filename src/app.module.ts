/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';



@Module({
  imports: [UserModule, AuthModule, TaskModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
