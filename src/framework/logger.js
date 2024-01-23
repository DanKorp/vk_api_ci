const winston = require('winston');
const path = require('path');
const loggerConfig = require('../../configs/loggerConfig.json')

const logDir = path.resolve(__dirname, `../../logs/info.log`);
const myFormat = winston.format.combine(
    winston.format.timestamp({
        format: loggerConfig.timestampFormat,
    }),
    winston.format.printf(
        ({ level, timestamp, message }) => `${level}: ${[timestamp]}: ${message}`
    )
);

const Logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: myFormat,
            silent: true,
            level: "silly",
        }),

        new winston.transports.File({
            filename: logDir,
            level: "silly",
            format: myFormat,
            maxsize: loggerConfig.maxSize,
        }),
    ],
});

module.exports = Logger;