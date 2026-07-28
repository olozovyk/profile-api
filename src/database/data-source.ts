import dotenv from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { User } from '../user/user.entity';

dotenv.config();

export const entities: Pick<DataSourceOptions, 'entities'> = {
  entities: [User],
};

const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  ...entities,
});

export default dataSource;
