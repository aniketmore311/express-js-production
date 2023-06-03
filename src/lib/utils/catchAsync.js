/**
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import('../../types').AsyncHandler} AsyncHandler
 */
/**
 * @param {AsyncHandler} fn
 * @returns {RequestHandler}
 */
function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

module.exports = catchAsync
