import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/messages.model';

export  async function POST(req: Request) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { userId , role, content } = await req.json();
      const newMessage = await Message.create({
        userId,
        role,
        content,
        createdAt: new Date(),
      });

      return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  } else {
    return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
  }
}


export async function GET(req: Request) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('user');
    const chatId = url.searchParams.get('chatId');

    let filter: any = {};
    if (userId) {
      filter.user = userId;
    }
    if (chatId) {
      filter.chatId = chatId;
    }

    const chats = await Message.find(filter).sort({ updatedAt: -1 });    
    return NextResponse.json({ success: true, data: chats }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
