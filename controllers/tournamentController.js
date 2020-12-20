const tournamentRepository = require('../data/tournamentRepository');
const addressRepository = require('../data/addressRepository');

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

// This is breaking SRP but this is what we
// are doing for now 
const createTournament = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Create a tournament');

    let tournament = {
      tournament_name, 
      start_date, 
      end_date, 
      has_started, 
      game_system_cd, 
      number_of_rounds, 
      current_round
    } = req.body;

    const address = {
      address_line_1, 
      address_line_2, 
      address_line_3, 
      city, 
      state, 
      zipcode, 
      country
    } = req.body;

    const addressResponse = await addressRepository.create(address);

    tournament.address_id = addressResponse.address_id;
    tournament.created_by_user_id = req.user.id;
      
    const results = await tournamentRepository.create(tournament);
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const updateTournament = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Update a tournament');

    let tournament = {
      tournament_name, 
      start_date, 
      end_date, 
      has_started, 
      game_system_cd, 
      number_of_rounds, 
      current_round
    } = req.body;
      
    tournament.tournament_id = req.params.tournament_id;

    results = await tournamentRepository.update(tournament);
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = { getTournamentById, getAllTournaments, createTournament, updateTournament }