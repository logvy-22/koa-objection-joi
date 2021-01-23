import dotenv from 'dotenv';

dotenv.config();

const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    debug: true,
    migrations: {
      directory: 'src/database/migrations',
    },
    seeds: {
      directory: 'src/database/seeds',
    },
  },
  test: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.TEST_DB_NAME,
    },
    debug: true,
    migrations: {
      directory: 'src/database/migrations',
    },
    seeds: {
      directory: 'src/database/seeds',
    },
  },
};

export default knexConfig;
