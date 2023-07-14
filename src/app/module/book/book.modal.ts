import { Schema, model } from 'mongoose';
import { Book, BookMethods, IBookModel, Review } from './book.type';
import { JwtPayload } from 'jsonwebtoken';

const reviewSchema = new Schema<Review>({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const bookSchema = new Schema<Book, IBookModel, BookMethods>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    readLink: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Number,
      required: true,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    user: {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

bookSchema.methods.addReview = async function (
  rating: number,
  comment: string,
  userEmail: JwtPayload,
): Promise<Book> {
  const review = {
    rating,
    comment,
    userEmail,
  };

  this.reviews.push(review);
  await this.save();
  return this.toObject();
};

const BookModal = model<Book, IBookModel>('Book', bookSchema);
export default BookModal;
