//@ts-check
const makeApp = require("../../../src/makeApp")
const catchAsync = require("../../../src/utils/catchAsync")
const request = require('supertest')

describe('catchAsync', () => {
    it('should forward error when thrown inside async handler', async () => {
        /**@type {import("../../../src/types").Controller} */
        let mockController = {
            register(app) {
                app.get('/error', catchAsync(async (req, res, next) => {
                    throw new Error('test error')
                }))
            }
        }
        let app = makeApp({ controllers: [mockController] })
        let resp = await request(app).get('/error');
        expect(resp.statusCode).toBeGreaterThanOrEqual(400)
    })
})