import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body;
  const result = await BookService.addBook(book);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Book added successfully',
    data: result,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBooks();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Books fetched successfully',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.getSingleBook(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...book } = req.body;
  const userId = (req.user as JwtPayload).id;

  const result = await BookService.updateBook(id, book, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as JwtPayload).id;

  const result = await BookService.deleteBook(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  addBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
