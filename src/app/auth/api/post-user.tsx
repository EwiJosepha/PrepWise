import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import User from '@/models/user.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { firstName, lastName } = req.body;

    const user = new User({ firstName, lastName });
    await user.save();

    return res.status(201).json(user);
  } else if (req.method === 'GET') {
    const users = await User.find();
    return res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
