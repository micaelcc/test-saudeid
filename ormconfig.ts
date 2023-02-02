import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

const connectionOptions = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
};

const dataSource = new DataSource({
  ...connectionOptions,
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [],
  migrations: ['src/infra/db/typeorm/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});

export { dataSource, connectionOptions };
