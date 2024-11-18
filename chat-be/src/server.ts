import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import chatRoutes from './route/index';
import connect from './db/db';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    credentials : true
  },
});


connect();


app.use(express.json());
app.use('/chat', chatRoutes);

let userSockets: any = {};

// Listen for client connections
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Handle user registration and store the socketId under their userId
  socket.on('register', (userId) => {
    if (!userSockets[userId]) {
      userSockets[userId] = {};
    }
    userSockets[userId].push(socket.id);
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  });

  socket.on('message', ({ senderId, recipientId, message }) => {
    const recipientSockets = userSockets[recipientId];
    
    if (recipientSockets) {
      recipientSockets.forEach((recipientSocketId:any) => {
        io.to(recipientSocketId).emit('receive_message', {
          senderId,
          message,
        });
      });
    } else {
      console.log(`User ${recipientId} is not connected.`);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    // Remove the socketId from userSockets when they disconnect
    for (const userId in userSockets) {
      userSockets[userId] = userSockets[userId].filter(
        (id:any) => id !== socket.id
      );
      if (userSockets[userId].length === 0) {
        delete userSockets[userId];
      }
    }
    console.log(`Socket ${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
