import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { connectionOptions } from 'ormconfig';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...connectionOptions,
};
