import express from 'express';
import { WishlistController } from './wishlist.controller';
import validationRequest from '../../middleware/validationRequest';
import { WishlistValidation } from './wishlist.validation';
import authenticate from '../../middleware/authenticate';

const router = express.Router();

router.post(
  '/add-to-wishlist',
  authenticate,
  validationRequest(WishlistValidation.wishlistSchema),
  WishlistController.addToWishList,
);

router.get(
  '/get-all-wishlist',
  authenticate,
  WishlistController.getAllWishList,
);

router.delete(
  '/delete-from-wishlist/:id',
  authenticate,
  WishlistController.deleteToWishList,
);

export const WishlistRouter = router;
