// backend/utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info', // Set default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(), // Adds colors to the console output
    customFormat
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// For unhandled exceptions
logger.exceptions.handle(
  new transports.File({ filename: 'logs/exceptions.log' })
);

module.exports = logger;
