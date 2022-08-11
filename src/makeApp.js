//@ts-check
/**
 * @typedef {import('./types').Controller} Controller
 * @typedef {import('./types').Application} Application
 * @typedef {import('./types').RequestHandler} RequestHandler
 * @typedef {import('./types').ErrorRequestHandler} ErrorRequestHandler
 */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const fs = require('fs')
const createError = require('http-errors')
const config = require('config')
const logger = require('./setup/logger')
const path = require('path')

//constants
const NODE_ENV = config.get('env.NODE_ENV')
const LOG_DIR = config.get('application.logDir')

/**
 * @param {{controllers: Controller[]}} controllers - list of controller to register with the express application
 * @returns {Application}
 */
function makeApp({ controllers }) {
  const app = express()

  app.use(cors())
  //@ts-ignore
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  //log to console
  app.use(
    morgan('common', {
      stream: {
        write: (message) => {
          logger.info(message.trim())
        },
      },
    })
  )
  // in production also log to a file
  if (NODE_ENV == 'production') {
    app.use(
      morgan('common', {
        stream: fs.createWriteStream(path.join(LOG_DIR, 'access.log')),
      })
    )
  }

  controllers.forEach((controller) => {
    controller.register(app)
  })

  app.use(notFoundHandler())
  app.use(errorLogger())
  app.use(errorHandler())

  return app
}

/**
 * @returns {RequestHandler}
 */
function notFoundHandler() {
  return function (req, res, next) {
    const err = new createError.NotFound('resource not found')
    next(err)
  }
}

/**
 * @returns {ErrorRequestHandler}
 */
function errorLogger() {
  return function (err, req, res, next) {
    logger.error(err.message, {
      error: {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500,
      },
    })
    logger.debug(err.stack)
    next(err)
  }
}

/**
 * @returns {ErrorRequestHandler}
 */
function errorHandler() {
  //eslint-disable-next-line no-unused-vars
  return function (err, req, res, next) {
    let status = 500
    let message = 'Something went wrong'

    if (err.statusCode) {
      status = err.statusCode
      message = err.message
    }
    const resp = {
      status,
      message,
    }
    res.status(status).json(resp)
    return
  }
}

module.exports = makeApp
