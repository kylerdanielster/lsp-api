const router = require('express').Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const validateRequest = require('../middleware/validateRequest');
const authController = require('../controllers/authController');

// @route GET api/auth
// @desc Is user logged in
// @access Private
router.get('/', auth, authController.getUser);

// @route POST api/auth
// @desc Log in a user, returns a token
// @access Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists().escape()
], 
  validateRequest,
  authController.loginUser
);

module.exports = router;