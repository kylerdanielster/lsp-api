const router = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const jwtGenerator = require('../utils/jwtGenerator');
const userRepository = require('../data/userRepository');

// @route POST api/user
// @desc Register user
// @access Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
  check('name', 'Name is required').exists().trim().escape()
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    
    const { email, password, name } = req.body;

    const user = await userRepository.getUserByEmail(email);

    if(user !== null) {
      console.log('User is already registered', user);
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.saveUser(email, bcryptPassword, name);

    const token = jwtGenerator(newUser.user_id);

    return res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500, 'Server error');
  }
});

module.exports = router;