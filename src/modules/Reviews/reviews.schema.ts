import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const CreateReviewSchema = z.object({
  bookId: z.string(), // Add bookId field
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export type createReviewSchemaInput = z.infer<typeof CreateReviewSchema>;

export const ResponseReviewSchema = z.object({
  _id: z.string(),
  bookId: z.string(),
  reviewer: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
});

export const { schemas: reviewSchemas, $ref } = buildJsonSchemas(
  {
    CreateReviewSchema,
    ResponseReviewSchema,
  },
  {
    $id: 'reviewSchema',
  }
);
