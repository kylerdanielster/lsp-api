const pool = require('./db');

const insertQuery = `INSERT INTO user_profile (user_id, first_name, last_name) 
                    VALUES ($1, $2, $3) 
                    RETURNING *`;

const updateQuery = `UPDATE user_profile SET
                    first_name = $1, 
                    last_name = $2
                    WHERE user_id = $3
                    RETURNING *`;

const getProfileByUserID = async (user_id) => {
  return await pool.query('SELECT * FROM user_profile WHERE user_id = $1', [user_id]);
}

const saveProfile = async (profile) => {
  return await pool.query(insertQuery, 
    [profile.user_id, profile.first_name, profile.last_name]);
}

const updateProfile = async (profile) => {
  return await pool.query(updateQuery, 
    [profile.first_name, profile.last_name, profile.user_id]);
}

module.exports = {
  getProfileByUserID,
  saveProfile,
  updateProfile
}