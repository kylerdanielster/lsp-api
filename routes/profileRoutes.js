const router = require('express').Router();
const auth = require('../middleware/auth');
const profileController = require('../controllers/profileController');
const validateRequest = require('../middleware/validateRequest');

const { check } = require('express-validator');


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/', auth, profileController.getProfileByUserID);


// TODO: FIX THIS ROUTE - secretly/silently updating a profile on a post 
// is BAD REST design. The front end can be smart enought to know
// if it needs to call new or udpated because it will have the profile id

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('first_name', 'First name is required').not().isEmpty().escape(),
  check('last_name', 'Last name is required').not().isEmpty().escape(),
  validateRequest,
  profileController.createProfile 
);

module.exports = router;