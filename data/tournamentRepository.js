const pool = require("./db");

const insertSql = `INSERT INTO tournament (
    created_by_user_id, 
    address_id, 
    name, 
    start_date, 
    end_date, 
    has_started, 
    game_system_cd, 
    number_of_rounds, 
    current_round, 
    last_update
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
  RETURNING *`;

const updateSql = `UPDATE tournament SET 
    name = $1, 
    start_date = $2, 
    end_date = $3, 
    has_started = $4, 
    game_system_cd = $5, 
    number_of_rounds = $6, 
    current_round = $7, 
    last_update = NOW()
  WHERE tournament_id = $8
  RETURNING *`;

const create = async(tournament) => {
  const results = await pool.query(insertSql, 
    [
      tournament.created_by_user_id, 
      tournament.address_id, 
      tournament.tournament_name, 
      tournament.start_date, 
      tournament.end_date, 
      tournament.has_started, 
      tournament.game_system_cd, 
      tournament.number_of_rounds, 
      tournament.current_round
    ]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const update = async(tournament) => {
  const results = await pool.query(updateSql,
    [
      tournament.name, 
      tournament.start_date, 
      tournament.end_date, 
      tournament.has_started, 
      tournament.game_system_cd, 
      tournament.number_of_rounds, 
      tournament.current_round,
      tournament.tournament_id
    ]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const getAll = async () => {
  const results = await pool.query('SELECT * FROM tournament');

  return results.rowCount === 0 ? null : results.rows;
}

const getById = async(tournament_id) => {
  const results = await pool.query('SELECT * FROM tournament WHERE tournament_id = $ 1', 
    [tournament_id]);

  return results.rowCount === 0 ? null : results.rows[0];
}

const destroy = async(tournament_id) => {
  const results = await pool.query('DELETE FROM tournament WHERE tournament_id = $1', 
    [tournament_id]);

    return results;
}

module.exports = { create, update, getById, getAll, destroy }