import mongoose from 'mongoose';

export type Wishlist = {
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
};
