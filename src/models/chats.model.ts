import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role:"" | "user" | "assistant" | "system" | "data";
  content: string;
  revisionId?: string;
  experimental_attachments?: string;
  createdAt: Date;
}

export interface IChat extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  messages: IMessage[];
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new Schema<IChat>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    lastMessageAt: { type: Date },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;
