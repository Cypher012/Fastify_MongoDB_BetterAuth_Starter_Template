import { FastifyReply, FastifyRequest } from 'fastify';
import Book from './books.model.js';
import { createBookSchemaInput, queryBookSchemaInput } from './books.schema.js';

export const getBooks = async (
  req: FastifyRequest<{ Querystring: queryBookSchemaInput }>,
  reply: FastifyReply
) => {
  try {
    const { populate } = req.query;

    let query = Book.find();

    if (populate === 'reviews') {
      query = query.populate({
        path: 'reviews',
      });
    }

    const books = await query.exec();

    reply.code(200).send(books);
  } catch (error) {
    reply.code(500).send({
      message: 'Failed to fetch books',
      error,
    });
  }
};

export const createBook = async (
  req: FastifyRequest<{ Body: createBookSchemaInput }>,
  reply: FastifyReply
) => {
  const book = req.body;
  try {
    const newBook = await Book.create(book);
    reply.code(201).send(newBook);
  } catch (error) {
    reply.code(500).send({ message: 'Failed to create book', error });
  }
};
