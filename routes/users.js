const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const { check, validationResult } = require('express-validator');

// @route GET api/user
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

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if(user.rows.length !== 0) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
        'INSERT INTO users (user_email, user_password, user_name) VALUES ($1, $2, $3) RETURNING *',
      [email, bcryptPassword, name]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500, 'Server error');
  }
});

module.exports = router;