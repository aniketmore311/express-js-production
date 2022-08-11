//@ts-check
const catchAsync = require("../../../../src/lib/utils/catchAsync")
const express = require('express')
const request = require('supertest')

describe('catchAsync', () => {
    it('should forward error when thrown inside async handler', async () => {
        //setup
        let app = express()
        app.get('/test', catchAsync(async () => {
            throw new Error('test error')
        }))
        app.use((err, req, res, next) => {
            return res.status(500).json({
                message: err.message
            })
        })
        //action
        let resp = await request(app).get('/test')
        //assert
        expect(resp.status).toEqual(500)
        expect(resp.body).toEqual({
            message: 'test error'
        })

    })
})