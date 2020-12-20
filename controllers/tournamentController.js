const tournamentRepository = require('../data/tournamentRepository');

const logging = require('../middleware/logging');
const NAMESPACE = 'Tournament';

const getTournamentById = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Getting a tournament by id');
    const results = await tournamentRepository.getById(req.params.tournament_id);

    if (results === null) {
      return res.status(400).json({ msg: 'There is no tournament with that id' });
    }

    return res.json(results);
  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const getAllTournaments = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Getting all tournaments');
    const results = await tournamentRepository.getAll();

    if (results === null) {
      return res.status(400).json({ msg: 'No tournaments found' });
    }

    return res.json(results);
  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const createTournament = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Create a tournament');

    const tournament = {
      created_by_user_id, 
      address_id, 
      tournament_name, 
      start_date, 
      end_date, 
      has_started, 
      game_system_cd, 
      number_of_rounds, 
      current_round
    } = req.body;
      
    results = await tournamentRepository.create(tournament);
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const updateTournament = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Update a tournament');

    const tournament = {
      created_by_user_id, 
      address_id, 
      tournament_name, 
      start_date, 
      end_date, 
      has_started, 
      game_system_cd, 
      number_of_rounds, 
      current_round
    } = req.body;
      
    results = await tournamentRepository.update(req.params.tournament_id, tournament);
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = { getTournamentById, getAllTournaments, createTournament, updateTournament }