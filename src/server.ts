import app from './app';
import mongoose from 'mongoose';
import config from './config';

async function run() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log('Connected to database');

    app.listen(config.port, () => {
      'Server is running on port ' + config.port;
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
}

run();
