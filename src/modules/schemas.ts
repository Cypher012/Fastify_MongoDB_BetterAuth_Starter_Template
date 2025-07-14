import {bookSchemas} from "./Books/books.schema"
import {genreSchemas} from "./Genres/genres.schema"
import {reviewSchemas} from "./Reviews/reviews.schema"
import {FastifyInstance} from "fastify";

const FastifySchemas = (fastify: FastifyInstance) => {
    for (const schema of bookSchemas){
        fastify.addSchema(schema);
    }
    for (const schema of genreSchemas){
        fastify.addSchema(schema);
    }
    for (const schema of reviewSchemas){
        fastify.addSchema(schema);
    }
}


export default FastifySchemas;