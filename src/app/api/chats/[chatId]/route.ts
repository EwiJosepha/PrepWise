import dbConnect from '@/lib/db';
import Chat from '@/models/chats.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
  ): Promise<NextResponse> {
  const { chatId } = await params;
  const { role, content } = await req.json();

  if (!chatId || !role || !content) {
    return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
  }

  if (!['user', 'assistant'].includes(role)) {
    return NextResponse.json({ success: false, error: 'Invalid role.' }, { status: 400 });
  }

  try {
    await dbConnect();

    const newMessage = { role, content, createdAt: new Date() };

    const updatedChat = await Chat.updateOne(
      { _id: chatId },
      {
        $push: { messages: newMessage },
        $set: { lastMessageAt: new Date() },
      }
    );

    if (updatedChat.modifiedCount === 0) {
      return NextResponse.json({ success: false, error: 'Chat not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ success: false, error: 'Failed to add message.' }, { status: 500 });
  }
}
