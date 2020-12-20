const pool = require("./db");


const insertSql = `INSERT INTO address(
    address_line_1, 
    address_line_2, 
    address_line_3, 
    city, 
    state, 
    zipcode, 
    country, 
    last_update
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
  RETURNING *;`;
  
const updateSql = `UPDATE address SET 
    address_line_1 = $1, 
    address_line_2 = $2, 
    address_line_3 = $3, 
    city = $4, 
    state = $5, 
    zipcode = $6, 
    country = $7, 
    last_update = NOW()
  WHERE address_id = $8
  RETURNING *;`;

const create = async(address) => {
  const results = await pool.query(insertSql, 
    [
      address.address_line_1, 
      address.address_line_2, 
      address.address_line_3, 
      address.city, 
      address.state, 
      address.zipcode, 
      address.country
    ]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const update = async(address_id, address) => {
  const results = await pool.query(updateSql,
    [
      address.address_line_1, 
      address.address_line_2, 
      address.address_line_3, 
      address.city, 
      address.state, 
      address.zipcode, 
      address.country,
      address_id
    ]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const getById = async(address_id) => {
  const results = await pool.query('SELECT * FROM address WHERE address_id = $ 1', 
    [address_id]);

  return results.rowCount === 0 ? null : results.rows[0];
}


module.exports = { create, update, getById }