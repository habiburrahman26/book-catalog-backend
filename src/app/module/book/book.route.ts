import express from 'express';
import { BookController } from './book.controller';
import validationRequest from '../../middleware/validationRequest';
import { BookValidation } from './book.validation';
import authenticate from '../../middleware/authenticate';

const router = express.Router();

router.post(
  '/add-book',
  validationRequest(BookValidation.bookSchema),
  BookController.addBook,
);

router.get('/get-books', BookController.getBooks);
router.get('/get-book/:id', BookController.getSingleBook);
router.patch(
  '/update-book/:id',
  authenticate,
  validationRequest(BookValidation.updateBookSchema),
  BookController.updateBook,
);

export const BookRouter = router;
