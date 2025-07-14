import mongoose from 'mongoose';

const uri = process.env.DATABASE_URL;

export async function connectDb() {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.name}`);
    return conn.connection.db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
