import '@types/jest'
import { generic, groups, users } from '.'
import { client } from '../db'

describe('Service Entity: Generic store tests', () => {
  afterAll(() => {
    client.close()
  })

  describe('Service Entity: Generic store tests', () => {
    const name = 'generic-test'
    afterAll(async () => {
      await generic.findOneAndDelete({ name })
    })
    test('Test insert generic', async () => {
      const res = await generic.insertOne({ name })
      expect(res?.insertedId).toBeDefined()
    })
    test('Test find generic', async () => {
      const res = await generic.findOne({ name })
      expect(res?.name).toBeDefined()
    })
    test('Test delete generic', async () => {
      expect(async () => await generic.findOneAndDelete({ name })).not.toThrow()
      const res = await generic.findOne({ name })
      expect(res?.name).not.toBeDefined()
    })
  })

  describe('Service Entity: group store tests', () => {
    const name = 'group-test'
    afterAll(async () => {
      await groups.findOneAndDelete({ name })
    })

    test('Test insert group', async () => {
      const res = await groups.insertOne({ name })
      expect(res?.insertedId).toBeDefined()
    })
    test('Test find group', async () => {
      const res = await groups.findOne({ name })
      expect(res?.name).toBeDefined()
    })
    test('Test delete group', async () => {
      expect(async () => await groups.findOneAndDelete({ name })).not.toThrow()
      const res = await groups.findOne({ name })
      expect(res?.name).not.toBeDefined()
    })
  })

  describe('Service Entity: user store tests', () => {
    const name = 'user-test'
    afterAll(async () => {
      await users.findOneAndDelete({ name })
    })

    test('Test insert user', async () => {
      const res = await users.insertOne({ name })
      expect(res?.insertedId).toBeDefined()
    })
    test('Test find user', async () => {
      const res = await users.findOne({ name })
      expect(res?.name).toBeDefined()
    })
    test('Test delete user', async () => {
      expect(async () => users.findOneAndDelete({ name })).not.toThrow()
      const res = await users.findOne({ name })
      expect(res?.name).not.toBeDefined()
    })
  })
})
