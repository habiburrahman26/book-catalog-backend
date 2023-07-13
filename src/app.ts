import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { AuthRouter } from './app/module/auth/auth.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1', AuthRouter);

export default app;
