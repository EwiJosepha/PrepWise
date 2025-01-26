import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Chat from '@/models/chats.model'

export async function POST(req:Request) {
  await dbConnect()

  if (req.method === 'POST') {
    try {
      const { user, title } = await req.json()
      const newChat = await Chat.create({
        user,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastMessageAt: new Date()
      })
      return NextResponse.json({ success: true, data: newChat }, {status: 201})
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, {status: 400})
    }
  } else {
    return NextResponse.json({ success: false, message: 'Method not allowed' }, {status: 405})
  }
}
