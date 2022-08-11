//@ts-check
const request = require('supertest')
const makeApp = require('../../../src/makeApp')
const healthController = require('../../../src/controllers/healthController')

describe('exampleController', () => {
  let app

  beforeAll(() => {
    app = makeApp({
      controllers: [healthController],
    })
  })

  it('should return status 200 when GET /', async () => {
    let resp = await request(app).get('/')
    expect(resp.statusCode).toEqual(200)
  })

  it('should return status 200 when GET /health', async () => {
    let resp = await request(app).get('/health')
    expect(resp.statusCode).toEqual(200)
  })
})
