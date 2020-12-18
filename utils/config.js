require('dotenv').config();

const PG_USERNAME = process.env.PG_USERNAME;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_HOST = process.env.PG_HOST || 'localhost';
const PG_PORT = process.env.PG_PORT || '5432';
const PG_DATABASE_NAME = process.env.PG_DATABASE_NAME;

const DATABASE = {
  user: PG_USERNAME,
  password: PG_PASSWORD,
  host: PG_HOST,
  name: PG_DATABASE_NAME,
  port: PG_PORT
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '5000';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const JWT = { 
  jwtSecret: process.env.jwtSecret,
  expiresIn: process.env.jwtExpiresIn
};

const config = {
  database: DATABASE,
  server: SERVER,
  jwt: JWT
};

module.exports = config;