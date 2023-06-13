import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import parseDBUrl from 'parse-database-url';
import env from './app.config';

const config = parseDBUrl(env().DATABASE_URL);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
