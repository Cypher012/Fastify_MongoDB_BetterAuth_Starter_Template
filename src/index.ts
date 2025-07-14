import Fastify, { FastifyInstance } from 'fastify';
import FastifySwagger from '@fastify/swagger';
import 'dotenv/config';
import { registerPlugins } from './plugins/index.js';
import FastifyRoutes from './modules/routes.js';
import FastifySchemas from './modules/schemas.js';
import { handleAuthRequest } from './utils/helper.js';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { connectDb } from './utils/db.js';
// Server configuration
async function createServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    },
  });
  await connectDb();
  return fastify;
}

// Graceful shutdown handling
function setupGracefulShutdown(fastify: FastifyInstance): void {
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      fastify.log.info(`Received ${signal}. Shutting down...`);
      await fastify.close();
      process.exit(0);
    });
  });
}

// Main server setup
async function buildServer(): Promise<FastifyInstance> {
  const fastify = await createServer();
  await fastify.register(FastifySwagger, {
    openapi: {
      info: {
        title: 'Books Review Application API',
        version: '1.0.0',
      },
      components: {},
    },
  });

  // Render the API reference

  await fastify.register(ScalarApiReference, {
    routePrefix: '/api/reference',
    // Additional hooks for the API reference routes. You can provide the onRequest and preHandler hooks
    hooks: {
      onRequest: function (request, reply, done) {
        done();
      },
      preHandler: function (request, reply, done) {
        done();
      },
    },
  });

  // …

  fastify.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    async handler(request, reply) {
      await handleAuthRequest(request, reply, fastify);
    },
  });

  await registerPlugins(fastify);
  await FastifyRoutes(fastify);
  FastifySchemas(fastify);
  setupGracefulShutdown(fastify);

  return fastify;
}

// Application entry point
async function main(): Promise<void> {
  try {
    const fastify = await buildServer();

    await fastify.listen({
      port: process.env.PORT,
      host: process.env.HOST,
    });

    fastify.log.info(
      `Server running on http://${process.env.HOST}:${process.env.PORT}`
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
main();
