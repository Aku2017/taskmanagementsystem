/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket, ...args: any[]) {
    // Handle new WebSocket connection
    console.log('New WebSocket client connected for user operations:', client.id);
  }

  handleDisconnect(client: WebSocket) {
    // Handle WebSocket disconnection
    console.log('WebSocket client disconnected:', client.id);
  }

  // Method to send a message to all connected WebSocket clients
  broadcastMessage(message: any) {
    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  // Example method to handle user CRUD events and broadcast updates
  handleUserCreated(user: any) {
    // Broadcast user creation event to connected clients
    this.broadcastMessage({ event: 'user_created', data: user });
  }

  // Example method to handle user update events and broadcast updates
  handleUserUpdated(user: any) {
    // Broadcast user update event to connected clients
    this.broadcastMessage({ event: 'user_updated', data: user });
  }

  // Example method to handle user deletion events and broadcast updates
  handleUserDeleted(userId: string) {
    // Broadcast user deletion event to connected clients
    this.broadcastMessage({ event: 'user_deleted', userId });
  }
}
