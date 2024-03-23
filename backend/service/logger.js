const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }) 
  ]
});

module.exports = logger;
