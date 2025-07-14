// src/utils/auth.ts
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { connectDb } from './db.js';
import { openAPI } from 'better-auth/plugins';

const db = await connectDb();

if (!db) throw new Error();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: ['http://localhost:8000'],
  emailAndPassword: { enabled: true },
  basePath: '/api/auth',
  plugins: [openAPI()],
});
