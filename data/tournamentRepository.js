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
    created_by_user_id = $1, 
    address_id = $2, 
    name = $3, 
    start_date = $4, 
    end_date = $5, 
    has_started = $6, 
    game_system_cd = $7, 
    number_of_rounds = $8, 
    current_round = $9, 
    last_update = NOW()
  WHERE tournament_id = $10
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

const update = async(tournament_id, tournament) => {
  const results = await pool.query(updateSql,
    [
      tournament.created_by_user_id, 
      tournament.address_id, 
      tournament.name, 
      tournament.start_date, 
      tournament.end_date, 
      tournament.has_started, 
      tournament.game_system_cd, 
      tournament.number_of_rounds, 
      tournament.current_round,
      tournament_id
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