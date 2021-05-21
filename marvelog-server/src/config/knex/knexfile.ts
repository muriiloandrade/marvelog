import Knex from 'knex';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: `../../../.env.${process.env.NODE_ENV}` });

module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost', // process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.OTS_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true,
  },
  migrations: {
    directory: path.join(__dirname, '/migrations'),
    stub: path.join(__dirname, '/migration.stub'),
  },
  seeds: {
    directory: path.join(__dirname, '/seeds'),
    stub: path.join(__dirname, './seed.stub'),
  },
} as Knex.Config;
