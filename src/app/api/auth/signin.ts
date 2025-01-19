

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/user.model';
import { AuthService } from '@/app/api/auth/auth.service';

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { email, password } = await request.json();
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({
        error: 'Invalid email or password',
      }, { status: 401 });
    }

    const isPasswordMatch = await AuthService.matchPassword({
      password,
      checkPassword: existingUser.password,
    });

    if (!isPasswordMatch) {
      return NextResponse.json({
        error: 'Invalid email or password',
      }, { status: 401 });
    }
    const token = AuthService.jwtSignUser({
      id: existingUser._id.toString(),
      email: existingUser.email,
    });

    console.log({token});
    
    return NextResponse.json({ data: { email: existingUser.email }, token }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ data: null }, { status: 500 });
  }
}

