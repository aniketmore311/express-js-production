//@ts-check
require('make-promises-safe')
require('dotenv').config()
require('./setup/index').setup()

const http = require('http')

const makeApp = require("./makeApp");
const healthController = require("./controllers/healthController");
const errorController = require("./controllers/errorController");
const configService = require("./config/configService")
const logger = require('./setup/logger')

async function main() {

    const app = makeApp({
        controllers: [healthController, errorController]
    })
    const server = http.createServer(app)
    const PORT = configService.get('PORT')

    server.listen(PORT, () => {
        logger.info(`server starter on http://localhost:${PORT}`)
    })
}

main().catch(err => {
    console.log(err)
    process.exit(1)
})