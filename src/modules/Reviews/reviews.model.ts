import { Schema, model, Types } from 'mongoose';

export interface IReview {
  bookId: Types.ObjectId;
  user: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);

const Review = model<IReview>('Review', reviewSchema);

export default Review;
