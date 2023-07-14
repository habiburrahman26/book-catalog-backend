import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/apiError';
import WishlistModal from './wishlist.model';
import { Wishlist } from './wishlist.type';

const addToWishList = async (payload: Wishlist) => {
  //check if book is already in wishlist with same user
  const isBookAlreadyInWishlist = await WishlistModal.findOne({
    $and: [{ bookId: payload.bookId }, { userId: payload.userId }],
  });

  if (isBookAlreadyInWishlist)
    throw new ApiError(StatusCodes.CONFLICT, 'Book is already in wishlist');

  const result = await WishlistModal.create(payload);
  return result;
};

const getAllWishList = async (userId: string): Promise<Wishlist[]> => {
  const wishlist = await WishlistModal.find({ userId }).populate('bookId');
  return wishlist;
};

export const WishlistService = {
  addToWishList,
  getAllWishList,
};
