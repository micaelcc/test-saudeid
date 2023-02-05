import { config } from 'dotenv';

config();

export const kafkaConfig = {
  serverName: process.env.KAFKA_SERVER_NAME,
  url: process.env.KAFKA_SERVER_URL,
};
