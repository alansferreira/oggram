import { setup } from '../../server'
import request from 'supertest'
import { Application } from 'express'
import { Group } from './types'
import { client } from '../db'
import { generic } from './service'

describe(`Entity route Tests`, () => {
  let app: Application
  const name = 'group-test'

  beforeAll(async () => {
    app = await setup()
    await generic.findOneAndDelete({ name })
  })

  afterAll(async () => {
    await generic.findOneAndDelete({ name })
    client.close()
  })

  test('POST /group', (done) => {
    const name = 'group-test'
    request(app)
      .post(`/entity`)
      .send({
        name,
        customData: {
          customFieldOne: 'value custom one'
        }
      } as Group)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body?.insertedId).toBeDefined()
        done()
      })
      .catch(done)
  })

  test('GET /group', (done) => {
    const name = 'group-test'

    request(app)
      .get(`/entity/${name}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body?.name).toBe(name)
        done()
      })
      .catch(done)
  })

  test('DELETE /group', (done) => {
    request(app)
      .delete(`/entity/${name}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body?.ok).toBe(1)
        done()
      })
      .catch(done)
  })

})
