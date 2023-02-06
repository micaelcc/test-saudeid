import { config } from 'dotenv';

config({ path: '.env.dev' });

export const mongodbConfig = {
  MONGO_URL_TEST: process.env.MONGO_URL,
  MONGO_URL_DEV: process.env.MONGODB_URL,
};
