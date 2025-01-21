import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/user.model';
import { AuthService } from '@/app/api/auth/auth.service';

export async function getCurrentUser(request: Request) {
  await connectToDatabase();

  const authHeader = request.headers.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Token not provided' }, { status: 401 });
  }

  const decoded = AuthService.jwtVerifyUser(token);
  
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
  }

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
