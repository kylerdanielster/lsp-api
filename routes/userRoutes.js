const router = require('express').Router();
const { check } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const userController = require('../controllers/userController');

// @route POST api/user
// @desc Register user
// @access Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists().escape(),
  check('name', 'Name is required').exists().trim().escape()
], 
  validateRequest,
  userController.registerUser
);

module.exports = router;