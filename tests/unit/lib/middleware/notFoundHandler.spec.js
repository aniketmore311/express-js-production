//@ts-check
const notFoundHandler = require("../../../../src/lib/middleware/notFoundHandler")
const express = require('express')
const { body } = require('express-validator')
const request = require('supertest')
const createHttpError = require("http-errors")

describe('catchAsync', () => {
    //setup
    let app;
    beforeAll(() => {
        app = express()
        app.get('/hello', (req, res) => {
            res.send("hello")
        })
        app.use(notFoundHandler())
        app.use((err, req, res, next) => {
            res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message
            })
        })
    })

    it('should propogate error when route not found', async () => {
        //action
        let resp = await request(app).get('/none')
        //assert
        expect(resp.status).toEqual(404)
        expect(resp.body).toEqual({
            statusCode: 404,
            message: 'resource not found'
        })

    })

})