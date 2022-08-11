import { setup } from '../server'
import request from 'supertest'
import { Application, Router } from 'express'
import { bearerToken } from './bearer-token'

const publicRoute = '/api/bearer-test'
const privateRoute = '/api/private/bearer-test'

describe(`[Middleware] bearer-token Tests`, () => {
  let app: Application

  beforeAll(async () => {
    app = await setup()
    app.use(
      Router().get(publicRoute, (req, res) =>
        res.status(200).json({ result: 'ok' })
      )
    )
    app.use(
      Router().get(privateRoute, bearerToken, (req, res) =>
        res.status(200).json({ result: 'ok' })
      )
    )
  })
  test('public route (load and pre-compile test)', (done) => {
    request(app)
      .get(`${publicRoute}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result).toBe('ok')
        done()
      })
      .catch(done)
  })
  test('private route without authorization header', (done) => {
    request(app)
      .get(`${privateRoute}`)
      .expect(401)
      .then(() => done())
      .catch(done)
  })

  test('private route with invalid authorization header', (done) => {
    request(app)
      .get(`${privateRoute}`)
      .set('authorization', 'bearer{dddddd}')
      .expect(401)
      .then(() => done())
      .catch(done)
  })

  test('private route with valid authorization header', (done) => {
    request(app)
      .get(`${privateRoute}`)
      .set('authorization', 'bearer dddddd')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result).toBe('ok')
        done()
      })
      .catch(done)
  })
})
