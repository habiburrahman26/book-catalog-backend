import { Schema, model } from 'mongoose';
import { Wishlist } from './wishlist.type';

const wishlistSchema = new Schema<Wishlist>({
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Auth',
  },
});

const WishlistModal = model<Wishlist>('Wishlist', wishlistSchema);

export default WishlistModal;
