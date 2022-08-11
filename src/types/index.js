/**
 * @typedef {import('express').Application} Application
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import("express").ErrorRequestHandler} ErrorRequestHandler
 */

/**
 * @callback ControllerRegisterFn
 * @param {Application} app
 * @returns {void}
 */

/**
 * @callback AsyncHandler
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */

/**
 * @typedef {Object} Controller
 * @property {ControllerRegisterFn} register - used to register controller with and app
 */

module.exports = {}
