//@ts-check
/**
 * @typedef {import('../types').RequestHandler} RequestHandler
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 */
const express = require('express')
const { body } = require('express-validator')
const validate = require('../lib/middleware/validate')

let exampleController = {
  /**@type {ControllerRegisterFn} */
  register(app) {
    let router = express.Router()

    router.post(
      '/login',
      [
        body('email').notEmpty().withMessage('email is required'),
        body('password').notEmpty().withMessage('password is required'),
        validate(),
      ],
      this.login.bind(this)
    )

    app.use('/example', router)
  },

  /** @type {RequestHandler} */
  login(req, res, next) {
    res.json(req.body)
  },
}

module.exports = exampleController
