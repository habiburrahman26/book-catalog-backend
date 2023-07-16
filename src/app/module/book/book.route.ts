import express from 'express';
import { BookController } from './book.controller';
import validationRequest from '../../middleware/validationRequest';
import { BookValidation } from './book.validation';
import authenticate from '../../middleware/authenticate';

const router = express.Router();

router.post(
  '/add-book',
  authenticate,
  validationRequest(BookValidation.bookSchema),
  BookController.addBook,
);

router.post('/add-review', authenticate, BookController.addReview);

router.get('/get-books', BookController.getBooks);
router.get('/get-book/:id', BookController.getSingleBook);
router.patch(
  '/update-book/:id',
  authenticate,
  validationRequest(BookValidation.updateBookSchema),
  BookController.updateBook,
);

router.delete('/delete-book/:id', authenticate, BookController.deleteBook);

export const BookRouter = router;
