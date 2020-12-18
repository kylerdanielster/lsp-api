const Pool = require('pg').Pool;
const config = require('../utils/config');

const pool = new Pool({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  database: config.database.name
})

module.exports = pool;