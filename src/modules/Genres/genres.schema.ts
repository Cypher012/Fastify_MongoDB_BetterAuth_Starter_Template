import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const CreateGenreSchema = z.object({
    name: z.string()

});

export type createGenreSchemaInput = z.infer<typeof CreateGenreSchema>;

export const ResponseGenreSchema = z.object({
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// export type responseBookSchemaInput = z.infer<typeof ResponseBookSchema>;

export const { schemas: genreSchemas, $ref } = buildJsonSchemas(
    {
        CreateGenreSchema,
        ResponseGenreSchema,
    },
    {
        $id: 'genreSchema',
    }
);
