/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksGateway } from 'src/websocket/taskgateway'

@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    providers: [TaskService,TasksGateway],
})
export class TaskModule {}