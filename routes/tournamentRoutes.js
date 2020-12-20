const router = require('express').Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const validateRequest = require('../middleware/validateRequest');
const tournamentController = require('../controllers/tournamentController');

// @route GET api/tournament
// @desc Get all tournaments
// @access Private
router.get('/', auth, tournamentController.getAllTournaments);

// @route GET api/tournament/:tournament_id
// @desc Get tournament by id
// @access Private
router.get('/:tournament_id', auth, tournamentController.getTournamentById);


// @route POST api/tournament
// @desc Create a tournament
// @access Public
router.post('/', [
  check('tournament_name', 'Name is required').not().isEmpty().trim().escape(),
  check('start_date', 'Start date is required').not().isEmpty().trim().escape(),
  check('game_system_cd', 'Game system is required').not().isEmpty().trim().escape(),
  check('number_of_rounds', 'Number of rounds required').not().isEmpty().isInt(),
  check('address_line_1', 'Address is required').not().isEmpty().trim().escape(),
  check('address_line_2').optional().trim().escape(),
  check('city', 'City is required').not().isEmpty().trim().escape(),
  check('zipcode', 'Zipcode is required').not().isEmpty().trim().escape(),
], 
  auth,
  validateRequest,
  tournamentController.createTournament
);

// @route POST api/tournament/:tournament_id
// @desc Update a tournament
// @access Public
router.post('/:tournament_id', [
  check('tournament_name', 'Name is required').not().isEmpty().trim().escape(),
  check('start_date', 'Start date is required').not().isEmpty().trim().escape(),
  check('game_system_cd', 'Game system is required').not().isEmpty().trim().escape(),
  check('number_of_rounds', 'Number of rounds required').not().isEmpty().isInt(),
  check('address_line_1', 'Address is required').not().isEmpty().trim().escape(),
  check('address_line_2').optional().trim().escape(),
  check('city', 'City is required').not().isEmpty().trim().escape(),
  check('zipcode', 'Zipcode is required').not().isEmpty().trim().escape(),
], 
  auth,
  validateRequest,
  tournamentController.updateTournament
);

module.exports = router;