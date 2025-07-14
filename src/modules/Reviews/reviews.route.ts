import { FastifyInstance } from 'fastify';
import { $ref } from './reviews.schema.js';
import { createReview, getReviews } from './reviews.controller.js';

const reviewRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: $ref('ResponseReviewSchema'),
          },
        },
      },
    },
    getReviews
  );

  fastify.post(
    '/',
    {
      schema: {
        body: $ref('CreateReviewSchema'),
        response: {
          201: $ref('ResponseReviewSchema'),
        },
      },
    },
    createReview
  );
};

export default reviewRoutes;
