import { DataSource } from 'typeorm';

export const DATA_SOURCE_MOCK = new DataSource({
  host: 'fake_host',
  port: 5000,
  username: 'fake_user',
  password: 'fake_pass',
  database: 'fake_database',
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [],
  migrations: [],
});
