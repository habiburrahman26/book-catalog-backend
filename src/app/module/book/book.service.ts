import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/apiError';
import BookModal from './book.modal';
import { Book } from './book.type';
import { JwtPayload } from 'jsonwebtoken';

const addBook = async (payload: Book) => {
  const book = await BookModal.create(payload);
  return book;
};

const getBooks = async (): Promise<Book[]> => {
  const books = await BookModal.find();
  return books;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const isBookExist = await BookModal.findById(id);
  if (!isBookExist) return null;

  return isBookExist;
};

const updateBook = async (
  id: string,
  payload: Book,
  userId: JwtPayload,
): Promise<Book | null> => {
  const isBookExist = await BookModal.findById(id);

  if (!isBookExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  //check this book is added by this user or not
  if (isBookExist.user.id.toString() !== String(userId)) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this book',
    );
  }

  return await BookModal.findByIdAndUpdate(id, payload, { new: true });
};

const deleteBook = async (
  id: string,
  userId: JwtPayload,
): Promise<Book | null> => {
  const isBookExist = await BookModal.findById(id);

  if (!isBookExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  //check this book is added by this user or not
  if (isBookExist.user.id.toString() !== String(userId)) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to delete this book',
    );
  }

  return await BookModal.findByIdAndDelete(id);
};

export const BookService = {
  addBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
