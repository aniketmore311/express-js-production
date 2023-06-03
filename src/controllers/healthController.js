/**
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('express').RequestHandler} RequestHandler
 */
const express = require('express')

/**@type {ControllerRegisterFn} */
function registerHealthController(app) {
  const router = express.Router()
  router.get('/', healthHandler)
  router.get('/health', healthHandler)
  app.use('/', router)
}

/**@type {RequestHandler} */
function healthHandler(req, res, next) {
  const resp = {
    status: 'ok',
  }
  res.json(resp)
  return
}

module.exports = {
  registerHealthController,
}
