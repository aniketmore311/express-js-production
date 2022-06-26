//@ts-check
/**
 * @typedef {import('../types').Config} Config
 * @typedef {import('../types').ConfigFactory} ConfigFactory
 */
const path = require('path')

/**@type {ConfigFactory} */
function configFactory() {

    /**@type {Config} */
    const config = {
    }

    // load env variables
    for (let envVar in process.env) {
        config[envVar] = process.env[envVar]
    }

    //default values
    config.LOG_DIR = process.env.LOG_DIR || path.join(process.cwd(), 'logs')
    config.NODE_ENV = process.env.NODE_ENV || "development"
    config.PORT = process.env.PORT || "8080"

    //verify config type
    for (let key in config) {
        const value = config[key];
        if (value === undefined || value === null) {
            throw new Error(`config key ${key} is undefined`)
        }
        if (typeof value !== 'string') {
            throw new Error(`config key ${key} is not of type string`)
        }
    }

    return config
}

module.exports = configFactory