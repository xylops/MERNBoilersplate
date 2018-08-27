var winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ 
            filename: './backend/logs/error.log', 
            level: 'error' 
        }),
        new winston.transports.File({ 
            filename: './backend/logs/aio.log',
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;