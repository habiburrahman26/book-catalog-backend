import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { AuthRouter } from './app/module/auth/auth.route';
import handleGlobalError from './app/middleware/globalErrorHandler';
import { BookRouter } from './app/module/book/book.route';
import { WishlistRouter } from './app/module/wishlist/wishlist.router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/v1', AuthRouter);
app.use('/api/v1', BookRouter);
app.use('/api/v1', WishlistRouter);

app.use(handleGlobalError);

export default app;
