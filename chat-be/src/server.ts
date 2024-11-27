import express from 'express';
import http from 'http';
import cors from 'cors'
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import route from './route';
import connect from './db/db';
import { Message } from './models/message';
import { Conversation } from './models/conversation';
import mongoose from 'mongoose';
console.log(mongoose.models);
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  },
});
app.use(cors({
  origin: "*",
  credentials: true,
}));

connect();


app.use(express.json());
route(app);
let userSockets: any = {};

try {
  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Handle user registration and store the socketId under their userId
    let userId: any = socket.handshake.query?.user_id

    userSockets[socket.id] = userId;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);

    const onlineUserIds = Array.from(io.sockets.sockets.keys())

    onlineUserIds.forEach(async (socketId: any) => {
      try {
        const conversations = await Conversation
          .find({
            participants: {
              $in: [userSockets[socketId]],
            },
          })
          .populate({
            path: 'participants',
          }).lean();
          
        const result = conversations?.map(item => {
          return {
            _id: item._id,
            participant: item.participants.find((participant) =>
              participant._id.toString() !== userId
            )
          }
        })
        io.to(socketId).emit('getConversations', result);
      } catch (err) {
        socket.emit('err', { error: err });
      }
    })
    socket.on('getMessages', async ({conversationId},callback) => {
      try {
        const messages = await Message.find({ conversation_id: conversationId });
        callback(messages);
      } catch (err:any) {
        console.log('err',err);
        
        socket.emit('err', { error: err });
      }
    });

    socket.on('sendMessage', ({ senderUserId, recipientUserId, message, conversationId }) => {
      const recipientSocketIds = Object.keys(userSockets).filter((key) => userSockets[key] === recipientUserId);
      
      Message.create({
        conversation_id: conversationId,
        sender_id: senderUserId,
        content: message,
      });

      if (recipientSocketIds) {
        recipientSocketIds.forEach((recipientSocketId: any) => {
          io.to(recipientSocketId).emit('receive_message', {
            senderUserId,
            message,
          });
        });
      } else {
        console.log(`User ${recipientUserId} is not connected.`);
      }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      // Remove the socketId from userSockets when they disconnect
      delete userSockets[socket.id];

      console.log(`Socket ${socket.id} disconnected`);
    });
  });
} catch (err: any) {
  console.log(err.message);
}


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
