/**
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('../types').RequestHandler} RequestHandler
 */
const express = require('express')

const healthController = {
  /**@type {ControllerRegisterFn} */
  register(app) {
    const router = express.Router()
    router.get('/', this.healthHandler.bind(this))
    router.get('/health', this.healthHandler.bind(this))
    app.use('/', router)
  },

  /**@type {RequestHandler} */
  healthHandler(req, res, next) {
    const resp = {
      status: 'ok',
    }
    res.json(resp)
    return
  },
}

module.exports = healthController
