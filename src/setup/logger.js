//@ts-check
const winston = require('winston')
const path = require('path')
const configService = require('../config/configService')

const NODE_ENV = configService.get("NODE_ENV")
const LOG_DIR = configService.get("LOG_DIR")

const logger = winston.createLogger({
    level: NODE_ENV == 'development' ? "debug" : "info",
    format: winston.format.json(),
})

logger.add(new winston.transports.File({
    filename: path.join(LOG_DIR, "general.log"),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    level: 'info',

}))

logger.add(new winston.transports.File({
    filename: path.join(LOG_DIR, "error.log"),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    level: 'error',
}))

if (NODE_ENV == "development") {
    logger.add(new winston.transports.Console({
        format: winston.format.cli()
    }))
}

module.exports = logger