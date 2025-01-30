import mongoose, { Document, ObjectId, Schema } from 'mongoose';


export interface IMessage extends Document {
  userId: ObjectId;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Message = mongoose.models.Messages || mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
