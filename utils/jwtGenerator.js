const jwt = require('jsonwebtoken');
const config = require('./config');

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };
  
  // TODO: Change to 3600 or '1h' - 1 hour
  return jwt.sign(payload, 
    config.jwt.jwtSecret, 
    { expiresIn: config.jwt.expiresIn }
  );
}

module.exports = jwtGenerator;