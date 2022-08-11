//@ts-check
const request = require('supertest')
const makeApp = require('../../../src/makeApp')
const exampleController = require('../../../src/controllers/exampleController')

describe('exampleController', () => {
    let app;

    beforeAll(() => {
        app = makeApp({
            controllers: [
                exampleController
            ]
        })
    })

    describe('login', () => {

        it('should return error when email is missig', async () => {
            let resp = await request(app).post('/example/login').send({
                password: "pass"
            })
            expect(resp.statusCode).toEqual(400)
        })

        it('should return error when password is missig', async () => {
            let resp = await request(app).post('/example/login').send({
                email: "email"
            })
            expect(resp.statusCode).toEqual(400)
        })

    })
})