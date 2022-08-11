import { client, db } from './service'

describe('Db Tests', () => {
  afterAll(async () => {
    await client.close()
  })
  test('Test db filename', () => {
    expect(db).not.toBeUndefined()
  })
})
