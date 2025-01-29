
import dbConnect from '@/lib/db';
import Chat from '@/models/chats.model';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ chatId: string }> }): Promise<NextResponse> {
  const { chatId } = await params;
  const { messages } = await req.json();
  

  if (!chatId || typeof chatId !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Chat ID is required.' },
      { status: 400 }
    );
  }

  if (!Array.isArray(messages)) {
    return NextResponse.json(
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
      return NextResponse.json(
        { success: false, error: 'Chat not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: chat },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating chat messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update messages.' },
      { status: 500 }
    );
  }
};
