import { FastifyInstance } from 'fastify';
import bookRoutes from './Books/books.route';
import genreRoutes from "./Genres/genres.route";
import reviewRoutes from "./Reviews/reviews.route"


async function FastifyRoutes(fastify: FastifyInstance) {
    await fastify.register(bookRoutes, { prefix: '/api/books' });
    await fastify.register(genreRoutes, { prefix: '/api/genres' });
    await fastify.register(reviewRoutes, { prefix: '/api/reviews' });
}

export default FastifyRoutes;
