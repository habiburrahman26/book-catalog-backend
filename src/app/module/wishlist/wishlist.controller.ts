import { Request, Response } from 'express';
import { WishlistService } from './wishlist.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { JwtPayload } from 'jsonwebtoken';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const addData = {
    bookId: req.body.bookId,
    userId: (req?.user as JwtPayload).id,
  };
  const result = await WishlistService.addToWishList(addData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Added successfully',
    data: result,
  });
});

const getAllWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = (req?.user as JwtPayload).id;
  const result = await WishlistService.getAllWishList(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Fetch wishlist successfully',
    data: result,
  });
});

export const WishlistController = {
  addToWishList,
  getAllWishList,
};
