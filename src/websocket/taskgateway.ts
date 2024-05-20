/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  notifyTaskCreated(task: any) {
    this.server.emit('taskCreated', task);
  }

  notifyTaskUpdated(task: any) {
    this.server.emit('taskUpdated', task);
  }

  notifyTaskDeleted(taskId: number) {
    this.server.emit('taskDeleted', taskId);
  }
}
