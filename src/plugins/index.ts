import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import { createAuth } from '../utils/auth.js';

let auth: ReturnType<typeof createAuth>;

export async function registerPlugins(fastify: FastifyInstance): Promise<void> {
  // Initialize auth after DB connection is established
  if (!auth) {
    auth = createAuth();
  }

  // Register cookie plugin first (required for better-auth)
  await fastify.register(fastifyCookie);
  await fastify.register(fastifyCors, {
    origin: ['http://localhost:8000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  });

  fastify.decorateRequest('user', null as any);

  fastify.addHook('preHandler', async (request, reply) => {
    // Skip authentication for auth routes and OPTIONS requests
    if (request.url.startsWith('/api/auth') || request.method === 'OPTIONS') {
      fastify.log.info(`Skipping auth for: ${request.method} ${request.url}`);
      return;
    }

    fastify.log.info(
      `Authenticating request: ${request.method} ${request.url}`
    );

    try {
      const headers = new Headers();

      // Properly handle all header types
      for (const [key, value] of Object.entries(request.headers)) {
        if (typeof value === 'string') {
          headers.set(key, value);
        } else if (Array.isArray(value)) {
          headers.set(key, value.join(','));
        }
      }

      // Ensure cookies are properly set
      if (request.headers.cookie) {
        headers.set('cookie', request.headers.cookie);
      }
      fastify.log.info(
        'Request headers:',
        Object.fromEntries(headers.entries())
      );
      fastify.log.info('Cookies:', request.headers.cookie);

      const session = await auth.api.getSession({
        headers,
      });

      fastify.log.info('Session result:', session);

      if (!session || !session.user) {
        fastify.log.warn('No session or user found');
        return reply
          .code(401)
          .send({ message: 'Unauthorized: Session not found' });
      }

      fastify.log.info('User authenticated:', session.user);
      request.user = session.user;
    } catch (err) {
      fastify.log.error('Authentication error:', err);
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  });
}
