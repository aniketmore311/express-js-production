require('dotenv').config()

const config = require('config')
const http = require('http')

const makeApp = require('./makeApp')
const { registerHealthController } = require('./controllers/healthController')
const { registerExampleController } = require('./controllers/exampleController')
const logger = require('./setup/logger')

async function main() {
  const NODE_ENV = config.get('env.NODE_ENV')
  const PORT = config.get('application.port')

  const app = makeApp({
    registerFns: [registerExampleController, registerHealthController],
  })
  const server = http.createServer(app)

  server.listen(PORT, () => {
    logger.info(
      `server(mode: ${NODE_ENV}) started on: http://localhost:${PORT}`
    )
    logger.debug(`pid: ${process.pid}`)
  })

  function onClose() {
    logger.debug('graceful shutdown started')
    server.close(() => {
      logger.debug('graceful shutdown complete')
      process.exit(1)
    })
  }

  process.on('SIGINT', onClose)
  process.on('SIGTERM', onClose)

  process.on('unhandledRejection', function (err) {
    console.error(err)
    process.exit(1)
  })
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
