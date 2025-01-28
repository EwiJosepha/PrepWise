
import dbConnect from '@/lib/db';
import Chat from '@/models/chats.model';
import { NextRequest } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { chatId: string } }) => {
  const { chatId } = params;
  const { messages } = await req.json();

  if (!chatId || typeof chatId !== 'string') {
    return Response.json(
      { success: false, error: 'Chat ID is required.' },
      { status: 400 }
    );
  }

  if (!Array.isArray(messages)) {
    return Response.json(
      { success: false, error: 'Messages must be an array.' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { messages },
      { new: true }
    ).populate('messages');

    if (!chat) {
      return Response.json(
        { success: false, error: 'Chat not found.' },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, data: chat },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating chat messages:', error);
    return Response.json(
      { success: false, error: 'Failed to update messages.' },
      { status: 500 }
    );
  }
};
