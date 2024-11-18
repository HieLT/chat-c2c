import mongoose, { Document, Schema } from 'mongoose';

interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
}

const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
