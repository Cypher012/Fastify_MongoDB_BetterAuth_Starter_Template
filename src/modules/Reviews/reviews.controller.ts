import { FastifyReply, FastifyRequest } from 'fastify';
import Review from './reviews.model.js';
import { createReviewSchemaInput } from './reviews.schema.js';
import Book from '../Books/books.model.js';

export const getReviews = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const reviews = await Review.find();
    reply.code(200).send(reviews); // <-- assuming your response schema expects an array
  } catch (error) {
    reply.code(500).send({
      message: 'Failed to fetch books',
      error,
    });
  }
};

export const createReview = async (
  req: FastifyRequest<{ Body: createReviewSchemaInput }>,
  reply: FastifyReply
) => {
  const review = req.body;
  try {
    // Check if user exists in request
    if (!req.user) {
      return reply.code(401).send({ message: 'User not authenticated' });
    }

    const { id: reviewer } = req.user;

    // Create the review with proper field mapping
    const newReview = await Review.create({
      bookId: review.bookId,
      reviewer,
      rating: review.rating,
      comment: review.comment || '',
    });

    // Push the new review's _id to the Book's reviews array
    await Book.findByIdAndUpdate(
      review.bookId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    reply.code(201).send(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    reply.code(500).send({ message: 'Failed to create review', error });
  }
};
