const pool = require('./db');

const getUserByEmail = async (email) => {
  return await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
}



module.exports = {
  getUserByEmail
}