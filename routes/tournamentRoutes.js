const router = require('express').Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const validateRequest = require('../middleware/validateRequest');
const tournamentController = require('../controllers/tournamentController');

// @route GET api/tournament
// @desc Get all tournaments
// @access Public
router.get('/', tournamentController.getAllTournaments);

// @route GET api/tournament/:tournament_id
// @desc Get tournament by id
// @access Public
router.get('/:tournament_id', tournamentController.getTournamentById);


// @route POST api/tournament
// @desc Create a tournament
// @access Private
router.post('/', [
  check('tournament_name', 'Name is required').not().isEmpty().trim().escape(),
  check('start_date', 'Start date is required').not().isEmpty().trim().escape(),
  check('end_date').not().isEmpty().trim().escape(),
  check('game_system_cd', 'Game system is required').not().isEmpty().trim().escape(),
  check('number_of_rounds', 'Number of rounds required').isInt(),
  check('address_line_1', 'Address is required').not().isEmpty().trim().escape(),
  check('address_line_2').optional().trim().escape(),
  check('address_line_3').optional().trim().escape(),
  check('city', 'City is required').not().isEmpty().trim().escape(),
  check('state', 'State is required').not().isEmpty().trim().escape(),
  check('zipcode', 'Zipcode is required').not().isEmpty().trim().escape(),
], 
  auth,
  validateRequest,
  tournamentController.createTournament
);

// @route POST api/tournament/:tournament_id
// @desc Update a tournament
// @access Private
router.put('/:tournament_id', [
  check('tournament_name', 'Name is required').not().isEmpty().trim().escape(),
  check('start_date', 'Start date is required').not().isEmpty().trim().escape(),
  check('end_date').not().isEmpty().trim().escape(),
  check('game_system_cd', 'Game system is required').not().isEmpty().trim().escape(),
  check('number_of_rounds', 'Number of rounds required').isInt(),
], 
  auth,
  validateRequest,
  tournamentController.updateTournament
);

module.exports = router;