import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/messages.model';

export  async function POST(req: Request) {
  await dbConnect();

  if (req.method === 'POST') {    
    try {
      const { chatId, role, content } = await req.json();
      const newMessage = await Message.create({
        chatId,
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

