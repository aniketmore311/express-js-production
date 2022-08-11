const createHttpError = require("http-errors")

//@ts-check
/**
 * @returns {import("../../types").RequestHandler}
 */
function notFoundHandler() {
    return function (req, res, next) {
        const err = new createHttpError.NotFound('resource not found')
        next(err)
    }
}
module.exports = notFoundHandler