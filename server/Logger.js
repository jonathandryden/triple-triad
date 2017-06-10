const winston = require("winston");
const config = require("./config.js");
require("winston-loggly-bulk");

winston.add(winston.transports.Loggly, config.loggly);

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
