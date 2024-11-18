import express, { Request, Response } from 'express';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';

const router = express.Router();

router.get('/messages', async (req: Request, res: any) => {
  const { senderId, recipientId } = req.query;

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] }, // Ensure both sender and recipient are in participants
    });

    if (!conversation) {
      return res.status(404).send({ message: 'Conversation not found between the two users.' });
    }

    const conversationId = conversation._id;

    // Retrieve messages for the conversation
    const messages = await Message.find({ conversationId }).sort('timestamp');
    return res.send(messages); // Return the messages sorted by timestamp
  } catch (err) {
    console.error('Error fetching messages:', err);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
