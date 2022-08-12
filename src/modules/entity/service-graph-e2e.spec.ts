import { Entity } from '@alell/oggram-common'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { buildTree, generic } from '.'
import { client } from '../db'

describe('Service Entity: graph query tests', () => {
  const dataFile = resolve('src/modules/entity/mocks/sample-data.json')
  const sampleData: Entity<any, any>[] = JSON.parse(
    readFileSync(dataFile).toString()
  )

  beforeAll(async () => {
    await client.connect()
    await generic.deleteMany({
      name: { $in: sampleData.map((g) => g.name) }
    })

    await generic.insertMany(sampleData)
  })

  afterAll(async () => {
    await generic.deleteMany({
      name: { $in: sampleData.map((g) => g.name) }
    })
    await client.close()
  })

  test('Test graph query', async () => {
    const roots = await buildTree('team-one')

    expect(roots.length).toEqual(1)
    expect(roots[0].name).toEqual('master-org')
    expect(roots[0].children.filter((c) => c.name === 'team-one')).toBeDefined()
    // expect(root.chidren.find((c) => c.'team-one')).toBeTruthy()
    // expect(entities.get('team-one').name).toEqual('team-one')

    // expect(entities.get('master-org').children.length).toEqual(4)
  })
})
