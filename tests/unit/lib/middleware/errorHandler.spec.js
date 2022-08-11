//@ts-check
const errorHandler = require("../../../../src/lib/middleware/errorHandler")
const express = require('express')
const { body } = require('express-validator')
const request = require('supertest')
const createHttpError = require("http-errors")

describe('catchAsync', () => {
    //setup
    let app;
    beforeAll(() => {
        app = express()
        app.get('/expected', () => {
            throw new createHttpError.BadRequest('bad request')
        })
        app.get('/unexpected', () => {
            throw new Error('secret')
        })
        app.use(errorHandler())
    })

    it('should return proper response to expected error', async () => {
        //action
        let resp = await request(app).get('/expected')
        //assert
        expect(resp.status).toEqual(400)
        expect(resp.body).toEqual({
            statusCode: 400,
            message: 'bad request'
        })

    })

    it('should return proper response to expected error', async () => {
        //action
        let resp = await request(app).get('/unexpected')
        //assert
        expect(resp.status).toEqual(500)
        expect(resp.body.statusCode).toEqual(500)
        expect(resp.body.message).not.toContain('secret')
    })
})