import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

const MessageSchema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
