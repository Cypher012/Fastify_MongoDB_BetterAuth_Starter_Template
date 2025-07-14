import {FastifyReply, FastifyRequest} from "fastify";
import Genre from "./genres.model";
import {createGenreSchemaInput} from "./genres.schema"

export const getGenre = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const genres = await Genre.find();
        reply.code(200).send(genres); // <-- assuming your response schema expects an array
    } catch (error) {
        reply.code(500).send({
            message: 'Failed to fetch books',
            error,
        });
    }
};


export const createGenre = async (req: FastifyRequest<{ Body: createGenreSchemaInput }>, reply: FastifyReply) => {
    const book = req.body
    try {
        const newBook = await Genre.create(book);
        reply.code(201).send(newBook);
    } catch (error) {
        reply.code(500).send({ message: 'Failed to create book', error });
    }
}
