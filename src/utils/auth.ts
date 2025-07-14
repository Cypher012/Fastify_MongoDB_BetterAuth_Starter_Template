// src/utils/auth.ts
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import mongoose from 'mongoose';
import { openAPI } from 'better-auth/plugins';

export function createAuth() {
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB not connected');
  return betterAuth({
    database: mongodbAdapter(db),
    trustedOrigins: ['http://localhost:8000'],
    emailAndPassword: { enabled: true },
    basePath: '/api/auth',
    plugins: [openAPI()],
  });
}
