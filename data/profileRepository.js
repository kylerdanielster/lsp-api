const pool = require('./db');

const insertQuery = `INSERT INTO user_profile (user_id, first_name, last_name, last_update) 
                    VALUES ($1, $2, $3, NOW()) 
                    RETURNING *`;

const updateQuery = `UPDATE user_profile SET
                    first_name = $1, 
                    last_name = $2,
                    last_update = NOW()
                    WHERE user_id = $3
                    RETURNING *`;

const getProfileByUserID = async (user_id) => {
  const results = await pool.query('SELECT * FROM user_profile WHERE user_id = $1', [user_id]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const saveProfile = async (profile) => {
  const results = await pool.query(insertQuery, 
    [profile.user_id, profile.first_name, profile.last_name]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const updateProfile = async (profile) => {
  const results = await pool.query(updateQuery, 
    [profile.first_name, profile.last_name, profile.user_id]);

  return results.rowCount === 0 ? null : results.rows[0];
}

module.exports = {
  getProfileByUserID,
  saveProfile,
  updateProfile
}