import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { IMessage } from './messages.schema';
export interface IChat extends Document {
  user: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  messages: IMessage[] | ObjectId[];
}

const ChatSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastMessageAt: { type: Date },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true,
  }
);


const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;
