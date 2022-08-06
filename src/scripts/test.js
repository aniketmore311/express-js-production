require('dotenv').config()
const config = require('config')

function main() {
    console.log(config.get('application.port'))
}
main()