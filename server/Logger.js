const winston = require("winston");
const config = require("./config.js");
require("winston-loggly-bulk");

 winston.add(winston.transports.Loggly, config.loggly);

class Logger {
  static log(msg, level = "info") {
    winston.log(level, msg);
  }
}

module.exports = Logger;
