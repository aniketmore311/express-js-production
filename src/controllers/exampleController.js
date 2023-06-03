/**
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('../types').AsyncHandler} AsyncHandler
 */
const express = require('express')
const { body } = require('express-validator')
const validate = require('../lib/middleware/validate')
const catchAsync = require('../lib/utils/catchAsync')
const createHttpError = require('http-errors')

/**@type {ControllerRegisterFn} */
function registerExampleController(app) {
  let router = express.Router()

  router.post(
    '/login',
    [
      body('email').notEmpty().withMessage('email is required'),
      body('password').notEmpty().withMessage('password is required'),
      validate(),
    ],
    catchAsync(login)
  )

  app.use('/example', router)
}

/** @type {AsyncHandler} */
async function login(req, res, next) {
  if (req.body.email == 'user@gmail.com' && req.body.password == 'pass123') {
    return res.json({
      message: 'login successful',
    })
  } else {
    throw new createHttpError.BadRequest('invalid credentials')
  }
}

module.exports = {
  registerExampleController,
}
