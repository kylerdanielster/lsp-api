const bcrypt = require('bcrypt');

const jwtGenerator = require('../utils/jwtGenerator');
const userRepository = require('../data/userRepository');

const logging = require('../middleware/logging');
const NAMESPACE = 'User';

const registerUser = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Register a user');
    
    const { email, password, name } = req.body;

    const user = await userRepository.getUserByEmail(email);

    if(user !== null) {
      logging.info(NAMESPACE, 'User is already registered');
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.saveUser(email, bcryptPassword, name);

    const token = jwtGenerator(newUser.user_id);

    return res.json({ token });

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    res.status(500, 'Server error');
  }
}

const deleteUser = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Deleting a user');
    
    const { user_id } = req.body;

    const user = await userRepository.deleteUser(user_id);

    return res.status(200);
  } catch(err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = { registerUser, deleteUser};