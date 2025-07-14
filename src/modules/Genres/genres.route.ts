import { FastifyInstance } from 'fastify';
import { $ref } from './genres.schema';
import {createGenre, getGenre} from "./genres.controller"

const genreRoutes = (fastify: FastifyInstance) => {
    fastify.get(
        '/',
        {
            schema: {
                response: {
                    200: {
                        type: 'array',
                        items: $ref('ResponseGenreSchema'),
                    },
                },
            },
        },
        getGenre
    );

    fastify.post(
        '/',
        {
            schema: {
                body: $ref('CreateGenreSchema'),
                response: {
                    201: $ref('ResponseGenreSchema'),
                },
            },
        },
        createGenre
    );
};

export default genreRoutes;
