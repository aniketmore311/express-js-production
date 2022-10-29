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
const config = require('config')
const logger = require('./setup/logger')
const path = require('path')
const notFoundHandler = require('./lib/middleware/notFoundHandler')
const errorHandler = require('./lib/middleware/errorHandler')
const errorLogger = require('./lib/middleware/errorLogger')

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
  app.use(errorLogger({logger}))
  app.use(errorHandler())

  return app
}


module.exports = makeApp
