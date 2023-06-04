/**
 * @typedef {import('./types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('express').Application} Application
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import('express').ErrorRequestHandler} ErrorRequestHandler
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
const swaggerUi = require('swagger-ui-express')
const YAML = require('yaml')

//constants
const NODE_ENV = config.get('env.NODE_ENV')
const LOG_DIR = config.get('application.logDir')
const OPENAPI_YAML_DOC_PATH = path.join(process.cwd(), 'openapi.yaml')

/**
 * @param {{registerFns: ControllerRegisterFn[]}} registerFns - list of controller to register with the express application
 * @returns {Application}
 */
function makeApp({ registerFns }) {
  const app = express()

  app.use(cors())
  //@ts-ignore
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  const file = fs.readFileSync(OPENAPI_YAML_DOC_PATH, 'utf8')
  const swaggerDocument = YAML.parse(file)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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

  registerFns.forEach((fn) => {
    fn(app)
  })

  app.use(notFoundHandler())
  app.use(errorLogger({ logger }))
  app.use(errorHandler())

  return app
}

module.exports = makeApp
