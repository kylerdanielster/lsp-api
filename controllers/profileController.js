const profileRepository = require('../data/profileRepository');

const logging = require('../middleware/logging');
const NAMESPACE = 'Profile';

const getProfileByUserID = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Getting a profile by id');
    const results = await profileRepository.getProfileByUserID(req.user.id);

    if (results === null) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.json(results);
  } catch (err) {
    logging.error(NAMESPACE, err.message);
    res.status(500).send('Server Error');
  }
}

const createProfile = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Create a profile');

    // build a profile
    const profile = {
      user_id: req.user.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };

    // TODO: Seriously, make this RESTful

    let results = await profileRepository.updateProfile(profile);
    logging.warn(NAMESPACE, 'Tried update: ', results);

    // check to see if any rows were updated
    // if none were updated, do an insert
    if(results === null) {
      logging.warn('Did and insert');
      results = await profileRepository.saveProfile(profile);
    }
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = { getProfileByUserID, createProfile };