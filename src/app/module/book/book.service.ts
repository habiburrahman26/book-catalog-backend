import BookModal from './book.modal';
import { Book } from './book.type';

const addBook = async (payload: Book) => {
  const book = await BookModal.create(payload);
  return book;
};

const getBooks = async (): Promise<Book[]> => {
  const books = await BookModal.find();
  return books;
};

const getSingleBook = async (id: number): Promise<Book | null> => {
  //check book exist or not
  const isBookExist = await BookModal.findById(id);
  if (!isBookExist) return null;

  return isBookExist;
};

// const updateBook = async (id: number, payload: Book): Promise<Book | null> => {
//     //check book exist or not
//     const isBookExist = await BookModal.findById(id);
//     if (!isBookExist) return null;



// })

export const BookService = {
  addBook,
  getBooks,
  getSingleBook,
};
