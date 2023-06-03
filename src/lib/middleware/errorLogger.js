/**
 * @returns {import("express").ErrorRequestHandler}
 */
function errorLogger({
    //@ts-ignore
    logger
}) {
    return function (err, req, res, next) {
        logger.error(err.message, {
            error: {
                message: err.message,
                stack: err.stack,
                statusCode: err.statusCode || 500,
            },
        })
        logger.debug(err.stack)
        next(err)
    }
}

module.exports = errorLogger
