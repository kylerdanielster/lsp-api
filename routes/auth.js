const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const jwtGenerator = require('../utils/jwtGenerator');
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc Test route
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await pool.query('SELECT user_email FROM users WHERE user_email = $1', [email]);

    res.json(user.rows[0].user_email);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Log in a user, returns a token
// @access Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists().escape()
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
      
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if(user.rows.length === 0) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if(!validPassword) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const token = jwtGenerator(user.rows[0].user_id);

    return res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500, 'Server error');
  }
});

module.exports = router;