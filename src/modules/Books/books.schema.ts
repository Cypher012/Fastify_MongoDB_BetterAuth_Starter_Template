import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';
import { ResponseReviewSchema } from '../Reviews/reviews.schema.js';

export const QueryParamBookSchema = z.object({
  populate: z.string().optional(),
});

export type queryBookSchemaInput = z.infer<typeof QueryParamBookSchema>;

export const CreateBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  category: z.array(z.string()),
  rating: z.number(),
  description: z.string(),
  image: z.string().url(), // assumes it's a URL to the book cover
  published: z.date(),
  publisher: z.string(),
  isbn: z.string(),
  pages: z.number().int().min(1),
  language: z.string(),
});

export type createBookSchemaInput = z.infer<typeof CreateBookSchema>;

export const ResponseBookSchema = z.object({
  // userId: z.string(), // assuming userId is a string, adjust if it's an ObjectId
  _id: z.string(),
  title: z.string(),
  author: z.string(),
  category: z.array(z.string()),
  rating: z.number(),
  description: z.string(),
  image: z.string().url(), // assumes it's a URL to the book cover
  published: z.date(),
  publisher: z.string(),
  isbn: z.string(),
  pages: z.number().int().min(1),
  language: z.string(),
  reviews: z.array(ResponseReviewSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const { schemas: bookSchemas, $ref } = buildJsonSchemas(
  {
    QueryParamBookSchema,
    CreateBookSchema,
    ResponseBookSchema,
  },
  {
    $id: 'bookSchema',
  }
);
