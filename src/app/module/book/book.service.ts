import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/apiError';
import BookModal from './book.modal';
import { Book, FilterType, Review } from './book.type';
import { JwtPayload } from 'jsonwebtoken';

type UserInfo = {
  id: string;
  email: string;
};

const addBook = async (payload: Book, userInfo: UserInfo) => {
  const book = await BookModal.create({
    ...payload,
    user: {
      id: userInfo.id,
      email: userInfo.email,
    },
  });
  return book;
};

const getBooks = async (filtersOptions: FilterType): Promise<Book[]> => {
  const { search, ...filters } = filtersOptions;
  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ],
    });
  }

  if (filters.genres) {
    const genres = filters.genres.split(',');
    andConditions.push({ genre: { $in: genres } });
  }

  if (filters.publicationDate) {
    andConditions.push({
      publicationDate: { $eq: Number(filters.publicationDate) },
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const books = await BookModal.find(whereConditions)
    .sort({ createdAt: -1 })
    .lean();
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

const addReview = async (
  id: string,
  payload: Review,
  userEmail: JwtPayload,
): Promise<Book> => {
  const isBookExist = await BookModal.findById(id);
  if (!isBookExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  //check user already added review or not
  const isReviewExist = isBookExist.reviews.find(
    review => review.userEmail === String(userEmail),
  );

  if (isReviewExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You already added review');
  }

  return await isBookExist.addReview(
    payload.rating,
    payload.comment,
    userEmail,
  );
};

export const BookService = {
  addBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReview,
};
