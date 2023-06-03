/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */
const expv = require('express-validator')
const createHttpError = require('http-errors')

/**
 * @returns {RequestHandler}
 */
function validate() {
  return function (req, res, next) {
    const errors = expv.validationResult(req)
    if (!errors.isEmpty()) {
      let errArr = errors.array()
      let message = errArr[0].msg
      let err = new createHttpError.BadRequest(message)
      next(err)
    }
    next()
  }
}

module.exports = validate
