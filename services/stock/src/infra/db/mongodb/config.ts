import { config } from 'dotenv';

config();

export const mongodbConfig = {
  MONGO_URL_TEST: process.env.MONGO_URL,
  MONGO_URL_DEV: process.env.MONGODB_URL,
};
