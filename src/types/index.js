/**
 * @typedef {import('express').Application} Application
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import("express").ErrorRequestHandler} ErrorRequestHandler
 */

/**
 * @typedef {Object<string,string|undefined>} Config
 */

/**
 * @callback ConfigFactory
 * @returns {Config} config
 */

/**
 * @callback getConfigFn 
 * @param {string} key
 * @returns {string} value
 */

/**
 * @typedef {Object} configService
 * @property {getConfigFn} get
 */

/**
 * @callback ControllerRegisterFn
 * @param {Application} app
 * @returns {void}
 */

/**
 * @typedef {Object} Controller
 * @property {ControllerRegisterFn} register - used to register controller with and app
 */

module.exports = {}