const winston = require("winston");
const config = require("./config.js");
require("winston-loggly-bulk");

if (config.loggly) {
  winston.add(winston.transports.Loggly, config.loggly);
}

class Logger {
  static log(msg) {
    console.log(msg);
    if (config.loggly) {
      winston.debug(msg);
    }
  }

  static info(msg) {
    if (config.loggly) {
      winston.info(msg);
    }
  }

  static warn(msg) {
    if (config.loggly) {
      winston.warn(msg);
    }
  }

  static error(msg) {
    if (config.loggly) {
      winston.error(msg);
    }
  }
}

module.exports = Logger;
