const router = require('express').Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const profileRepository = require('../data/profileRepository');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await profileRepository.getProfileByUserID(req.user.id);

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
      const profile = {
        user_id: req.user.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      };

      let results = await profileRepository.updateProfile(profile);

      // check to see if any rows were updated
      // if none were updated, do an insert
      if(results.rowCount === 0) {
        console.log('Did an insert');
        results = await profileRepository.saveProfile(profile);
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

    let results = await profileRepository.getProfileByUserID(req.params.user_id);

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


module.exports = router;