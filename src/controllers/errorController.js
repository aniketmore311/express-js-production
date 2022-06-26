//@ts-check
/**
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('../types').RequestHandler} RequestHandler
 */
const express = require('express')
const createHttpError = require('http-errors')

const errorController = {

    /**@type {ControllerRegisterFn} */
    register(app) {
        const router = express.Router()
        router.get("/_internal/error/expected", this.expectedErrorHandler.bind(this))
        router.get("/_internal/error/unexpected", this.unexpectedErrorHandler.bind(this))
        app.use("/", router)
    },

    /**@type {RequestHandler} */
    expectedErrorHandler(req, res, next) {
        throw new createHttpError.BadRequest("expected error message")
    },

    /**@type {RequestHandler} */
    unexpectedErrorHandler(req, res, next) {
        throw new Error("secret data")
    }
}

module.exports = errorController