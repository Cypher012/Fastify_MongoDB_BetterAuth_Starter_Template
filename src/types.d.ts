import 'fastify';
import z from 'zod';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image?: string | null | undefined;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z
    .enum(['development', 'production', 'testing'])
    .default('development'),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  CLIENT_ORIGIN: z.string().url(),
});

type EnvSchema = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}
