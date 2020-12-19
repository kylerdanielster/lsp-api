const chalk = require('chalk');

const info = (namespace, message, object) => {
  if (object) {
      console.info(chalk.blue(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object));
  } else {
      console.info(chalk.blue(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
  }
};

const warn = (namespace, message, object) => {
  if (object) {
      console.warn(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object));
  } else {
      console.warn(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
  }
};

const error = (namespace, message, object) => {
  if (object) {
      console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object));
  } else {
      console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
  }
};

const debug = (namespace, message, object) => {
  if (object) {
      console.debug(chalk.magenta(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object));
  } else {
      console.debug(chalks.magenta(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`));
  }
};

const getTimeStamp = () => {
  return new Date().toISOString();
};

module.exports = {
  info,
  warn,
  error,
  debug
};