import { Model, Types } from 'mongoose';

export type Review = {
  rating: number;
  comment: string;
  userEmail: string;
};

export type Book = {
  title: string;
  author: string;
  image: string;
  genre: string;
  publicationDate: number;
  readLink: string;
  reviews: Review[];
  user: {
    id: Types.ObjectId;
    email: string;
  };
};

export type BookMethods = {
  addReview(rating: number, comment: string, userEmail: string): void;
};

export type IBookModel = Model<Book, object, BookMethods>;
