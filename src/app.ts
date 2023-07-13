import { Application } from 'express';
import express from 'express';

const app: Application = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

export default app;
