//@ts-check
/**
 * @typedef {import('../../types').RequestHandler} RequestHandler
 */
const createError = require('http-errors')

/**
 * @returns {RequestHandler}
 */
function notFoundHandler() {
    return function (req, res, next) {
        const err = new createError.NotFound("resource not found")
        next(err)
    }
}

module.exports = notFoundHandler