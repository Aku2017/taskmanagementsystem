/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { WebSocket } from 'ws';


@WebSocketGateway()
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket) {
    // Handle new WebSocket connection
    console.log('New WebSocket client connected for user operations:', client['id']);
  }

  handleDisconnect(client: WebSocket) {
    // Handle WebSocket disconnection
    console.log('WebSocket client disconnected:', client['id']);
  }

  // Method to send a message to all connected WebSocket clients
  broadcastMessage(message: any) {
  // Check if this.server is defined
  if (this.server) {
    // Check if this.server.clients is defined
    if (this.server.clients) {
      this.server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    } else {
      console.log('No WebSocket clients connected');
    }
  } else {
    console.log('WebSocket server is not initialized');
  }
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
