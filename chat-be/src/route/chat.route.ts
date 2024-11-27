import { Router } from "express";
import { User } from "../models/user";
import { Message } from "../models/message";
import { Conversation } from "../models/conversation";
const chatRouter = Router();

chatRouter.get('/messages', async (req: any, res: any) => {
    const { conversationId } = req.query;
  
    try {
      try {
        const messages = await Message.find({ conversationId }).sort('timestamp');
  
        return res.send(messages);
  
      } catch (err: any) {
        res.status(400).send({ message: err.message })
      }
    } catch {
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
chatRouter.get('./conversations', async (req: any, res: any) => {
    const { participantId } = req.query;
    try {
      try {
        const conversation = await Conversation.findOne({
          participants: {
            $in: [participantId]
          },
        });
      } catch (err: any) {
        res.status(400).send({ message: err.message })
      }
    } catch {
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
chatRouter.post('/new-conversation', async (req: any, res: any): Promise<any> => {
    const { participant1_id, participant2_id } = req.body;
    try {
      try {
        const user1 = await User.findById(participant1_id);
        const user2 = await User.findById(participant2_id);
        if ( !user1 || !user2) {
          res.status(200).send('Không tìm thấy user')
          return ;
        }
  
        await Conversation.create({participants: [participant1_id,participant2_id]});
  
        res.status(201).send('Tạo mới thành công');
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    } catch {
      res.status(500).send({ message: 'Internal server error' });
    }
  })

export default chatRouter