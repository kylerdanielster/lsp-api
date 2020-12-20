const router = require('express').Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const validateRequest = require('../middleware/validateRequest');
const addressController = require('../controllers/addressController');

// @route GET api/tournament/:tournament_id
// @desc Get tournament by id
// @access Public
router.get('/:address_id', addressController.getAddressById);

// @route POST api/address
// @desc Create an address
// @access Private
router.post('/', [
  check('address_line_1', 'Address is required').not().isEmpty().trim().escape(),
  check('address_line_2').optional().trim().escape(),
  check('address_line_3').optional().trim().escape(),
  check('city', 'City is required').not().isEmpty().trim().escape(),
  check('zipcode', 'Zipcode is required').not().isEmpty().trim().escape(),
], 
  auth,
  validateRequest,
  addressController.createAddress
);

// @route POST api/address
// @desc Create an address
// @access Private
router.put('/:address_id', [
  check('address_line_1', 'Address is required').not().isEmpty().trim().escape(),
  check('address_line_2').optional().trim().escape(),
  check('address_line_3').optional().trim().escape(),
  check('city', 'City is required').not().isEmpty().trim().escape(),
  check('zipcode', 'Zipcode is required').not().isEmpty().trim().escape(),
], 
  auth,
  validateRequest,
  addressController.updateAddress
);

module.exports = router;