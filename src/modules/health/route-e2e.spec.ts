import { setup } from '../../server'
import request from 'supertest'
import { Application } from 'express'

const publicRoute = '/health'
describe(`${publicRoute} Tests`, () => {
  let app: Application

  beforeAll(async () => {
    app = await setup()
  })
  test('Test health', (done) => {
    request(app)
      .get(`${publicRoute}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('ok')
        done()
      })
      .catch(done)
  })
})
