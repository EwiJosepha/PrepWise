import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function connectToDatabase(): Promise<Connection> {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGODB_URI!)

  return mongoose.connection;
}

export default connectToDatabase;
