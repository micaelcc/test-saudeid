import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.dev' });

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
  entities: ['src/domain/**/*.entity{.ts,.js}'],
  migrations: ['src/infra/db/typeorm/migrations/*.ts'],
});

export { dataSource, connectionOptions };
