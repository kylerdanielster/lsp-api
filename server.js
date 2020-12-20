const express = require('express');
const config = require('./utils/config');
const cors = require('cors');
const logging = require('./middleware/logging');

const NAMESPACE = 'Server';
const app = express();
// Middleware
// TODO Add helment, rate limiting ect... 
// Add security best practices
// https://expressjs.com/en/advanced/best-practice-security.html
// https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices
// Other useful middleware
// https://blog.logrocket.com/express-middleware-a-complete-guide/
app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });
  next();
});

app.use(express.json());
app.use(cors());

// register and login routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/tournaments', require('./routes/tournamentRoutes'));


app.listen(config.server.port, () => logging.info(NAMESPACE, 
  `Server is running ${config.server.hostname}:${config.server.port}`));

module.exports = app; // for testing