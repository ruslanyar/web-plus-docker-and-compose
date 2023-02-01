import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    database: process.env.POSTGRES_DB || 'kupipodariday',
    entities: [path.resolve(`${__dirname}/../../**/*.entity{.ts,.js}`)],
    migrations: [
      path.resolve(`${__dirname}/../../src/db/migrations/*{.ts,.js}`),
    ],
    synchronize: false,
  } as PostgresConnectionOptions,

  saltRound: parseInt(process.env.SALT, 10) || 10,
  secretKey: process.env.JWT_SECRET || 'secret-key',
});
