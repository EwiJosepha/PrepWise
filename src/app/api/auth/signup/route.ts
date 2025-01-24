import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/user.model';
import { AuthService } from '@/app/api/auth/auth.service'

export async function POST(request: Request) {
  await connectToDatabase();

  const { firstName, lastName, email, password, confirmPassword } = await request.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({
      message: "User already exists, please try another name",
      data: null,
    }, { status: 409 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
  }
  const hashedPassword = await AuthService.hashPassword(password);

  const user = new User({ firstName, lastName, email, password: hashedPassword });

  try {
    await user.save();
    const token = AuthService.jwtSignUser({ id: user._id, email: user.email });
    return NextResponse.json({ user: { ...user.toObject(), password: undefined }, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}



// export async function GET() {
//   await connectToDatabase();

//   const users = await User.find();
//   return NextResponse.json(users, { status: 200 });
// }
