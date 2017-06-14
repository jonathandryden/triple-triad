const winston = require("winston"),
config = require("./config.js");

require("winston-loggly-bulk");

if (config.logging) {
  if (config.logging.loggly) winston.add(winston.transports.Loggly, config.logging.loggly);
  if (config.logging.file) winston.add(winston.transports.File, { filename: config.logging.file.location});
}


class Logger {
  static log(msg) {
    console.log(msg);
    winston.debug(msg);
  }

  static info(msg) {
    winston.info(msg);
  }

  static warn(msg) {
    winston.warn(msg);
  }

  static error(msg) {
    winston.error(msg);
  }
}

module.exports = Logger;
