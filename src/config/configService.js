//@ts-check
/**
 * @typedef {import("../types").configService} ConfigService
 */
const configFactory = require('./configFactory')

const config = configFactory()

/**@type {ConfigService} */
const configService = {
    get(key) {
        const val = config[key];
        if (val === undefined || val === null) {
            throw new Error(`config key ${key} is not defined`)
        }
        return val
    }
}

module.exports = configService