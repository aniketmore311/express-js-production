//@ts-check
/**
 * @typedef {import('../../types').ErrorRequestHandler} ErrorRequestHandler
 */
const createError = require('http-errors')

/**
 * @returns {ErrorRequestHandler}
 */
function errorHandler() {
    return function (err, req, res, next) {
        let status = 500;
        let message = "Something went wrong"

        if (err.statusCode) {
            status = err.statusCode;
            message = err.message
        }
        const resp = {
            status,
            message
        }
        res.status(status).json(resp)
        return
    }
}

module.exports = errorHandler