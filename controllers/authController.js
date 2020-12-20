const bcrypt = require('bcrypt');

const jwtGenerator = require('../utils/jwtGenerator');
const userRepository = require('../data/userRepository');

const logging = require('../middleware/logging');
const NAMESPACE = 'Auth';

const getUser = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Getting a user');
    
    const { email } = req.body;

    const user = await userRepository.getUserByEmail(email);

    return res.json(user.user_email);
  } catch(err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const loginUser = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Login a user');
    const { email, password } = req.body;

    const user = await userRepository.getUserByEmail(email);

    if(user === null) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
    const validPassword = await bcrypt.compare(password, user.user_password);

    if(!validPassword) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const token = jwtGenerator(user.user_id);

    return res.json({ token });

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    res.status(500, 'Server error');
  }
}

module.exports = { getUser, loginUser };