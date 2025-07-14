import { FastifyInstance } from 'fastify';
import { getBooks, createBook } from './books.controller.js';
import { $ref } from './books.schema.js';

const bookRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: $ref('QueryParamBookSchema'),
        response: {
          200: {
            type: 'array',
            items: $ref('ResponseBookSchema'),
          },
        },
      },
    },
    getBooks
  );

  fastify.post(
    '/',
    {
      schema: {
        body: $ref('CreateBookSchema'),
        response: {
          201: $ref('ResponseBookSchema'),
        },
      },
    },
    createBook
  );
};

export default bookRoutes;
