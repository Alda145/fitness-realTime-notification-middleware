import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
})
export class AppointmentsGateway {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        console.log(' Client connected:', client.id);
    }

    handleDisconnect(client: any) {
        console.log(' Client disconnected:', client.id);
    }

    emitUpdate(data: any) {
        console.log(" EMIT EVENT", data);
        this.server.emit('calendar:update', data);
    }
}