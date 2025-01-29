import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IMessage {
  id: string;
  experimental_attachments?: any;
  role: 'user' | 'assistant' | 'data' | 'system';
  content: string;
  createdAt?: Date;
}

export interface IChat extends Document {
  user: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  messages: IMessage[];
}

const ChatSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastMessageAt: { type: Date },
    messages: [{ type: String, ref: 'Message' }]
  },
  {
    timestamps: true,
  }
);


const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;
