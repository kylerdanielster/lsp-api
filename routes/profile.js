const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await pool.query(`SELECT * FROM user_profile WHERE user_id = $1`, [req.user.id]);

    const userProfile = profile.rows[0];

    if (!userProfile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('first_name', 'First name is required').not().isEmpty().escape(),
  check('last_name', 'Last name is required').not().isEmpty().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      // build a profile
      const profileFields = {
        user_id: req.user.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      };
      
      let insertQuery = `INSERT INTO user_profile (user_id, first_name, last_name) 
                          VALUES ($1, $2, $3) 
                          RETURNING *`;

      let updateQuery = `UPDATE user_profile SET
                          first_name = $1, 
                          last_name = $2
                          WHERE user_id = $3
                          RETURNING *`;
        

      let results = await pool.query(updateQuery, 
        [profileFields.first_name, profileFields.last_name, profileFields.user_id]);

      // check to see if any rows were updated
      // if none were updated, do an insert
      if(results.rowCount === 0) {
        console.log('Did an insert');
        results = await pool.query(insertQuery, 
          [profileFields.user_id, profileFields.first_name, profileFields.last_name]);
      }

      const userProfile = results.rows[0];
      
      return res.json(userProfile);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// TODO this should be PRIVATE!?
// @route    POST api/profile/user/:user_id
// @desc     Get profile by user id
// @access   Public 
router.get('/user/:user_id', async (req, res) => {
  try {
    let results = await pool.query(`
      SELECT first_name, last_name FROM user_profile WHERE user_id = $1`,
      [req.params.user_id]);
     if (!results.rows.length === 0) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

   return res.json(results.rows[0]);
  } catch (err) {

    // *** NOTE *** I dont like this but I dont see a better way to 
    // know that the query failed to find because of invalid user_id (uuid)

    if(err.message.includes('uuid')) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(500).send('Server error');
  }
});

// TODO REMOVE THIS?!
// @route    POST api/profile
// @desc     Get profiles
// @access   Public 
router.get('/', async (req, res) => {
  try {
    let results = await pool.query(
      `SELECT p.first_name, p.last_name, u.user_email FROM user_profile p JOIN users u on p.user_id = u.user_id`);
    return res.json(results.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;