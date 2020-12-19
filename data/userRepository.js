const pool = require('./db');

const getUserByEmail = async (email) => {
  const results = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const saveUser = async(email, bcryptPassword, name) => {
  const results = await pool.query(
    `INSERT INTO users (user_email, user_password, user_name, last_update) 
      VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [email, bcryptPassword, name]
    );
  
  return results.rowCount === 0 ? null : results.rows[0];
}


module.exports = {
  getUserByEmail,
  saveUser
}