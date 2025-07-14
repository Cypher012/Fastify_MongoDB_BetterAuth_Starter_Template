import { Schema, model, Types } from 'mongoose';
import { IReview } from '../Reviews/reviews.model.js';

export interface IBook {
  title: string;
  author: string;
  category: Types.ObjectId[];
  rating: number;
  description: string;
  image: string;
  published: Date;
  publisher: string;
  isbn: string;
  pages: number;
  language: string;
  reviews: Types.ObjectId[]; // referencing review documents
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: [String], required: true },
    rating: { type: Number, default: 0 }, // could also use min/max validation
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL to book cover
    published: { type: Date, required: true },
    publisher: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    pages: { type: Number, required: true },
    language: { type: String, required: true },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
);

const Book = model<IBook>('Book', bookSchema);

export default Book;
