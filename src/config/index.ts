import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_in: process.env.JWT_EXPIRES_IN,
};
