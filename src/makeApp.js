//@ts-check
/**
 * @typedef {import('./types').Controller} Controller
 * @typedef {import('./types').Application} Application
 */
const express = require('express');
const morgan = require('morgan');
const fs = require("fs")
const notFoundHandler = require("./lib/middleware/notFoundHandler")
const errorHandler = require("./lib/middleware/errorHandler");
const configService = require('./config/configService');
const logger = require('./setup/logger');
const path = require('path');

/**
 * @param {{controllers: Controller[]}} controllers - list of controller to register with the express application
 * @returns {Application}
 */
function makeApp({
    controllers,
}) {
    const app = express()

    const NODE_ENV = configService.get("NODE_ENV")
    const LOG_DIR = configService.get("LOG_DIR")

    //in development log using winston
    if (NODE_ENV == "development") {
        app.use(morgan("dev", {
            stream: {
                write: (message) => {
                    logger.debug(message.trim())
                }
            }
        }))
    }
    // in production log to a file
    if (NODE_ENV == "production") {
        app.use(morgan('combined', {
            stream: fs.createWriteStream(path.join(LOG_DIR, "access.log"))
        }))
    }
    controllers.forEach((controller) => {
        controller.register(app)
    })

    app.use(notFoundHandler())
    app.use(errorHandler())

    return app;
}

module.exports = makeApp;