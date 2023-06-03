const createHttpError = require("http-errors")

/**
 * @returns {import("express").RequestHandler}
 */
function notFoundHandler() {
    return function (req, res, next) {
        const err = new createHttpError.NotFound('resource not found')
        next(err)
    }
}
module.exports = notFoundHandler