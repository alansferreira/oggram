import { Entity } from '@alell/oggram-common'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { walkBottom, walkTop, buildTree, generic } from './service'
import { client } from '../db'
jest.setTimeout(9000000)

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
    await client.close(true)
  }, 2000)

  test('Test walkUp', async () => {
    const entity = await generic.findOne({ name: 'team-one' })

    const node = await walkTop(entity)

    expect(node[0].name).toEqual('master-org')
    expect(node[0].children.filter((c) => c.name === 'team-one')).toBeDefined()
  })

  test('Test walkBotom', async () => {
    const entity = await generic.findOne({ name: 'team-one' })

    // Builds path variables
    await walkTop(entity, 99)

    const node = await walkBottom(entity, 99)

    expect(node.name).toEqual('team-one')
    expect(node.children?.filter((c) => c.name === 'lead-one')).toBeDefined()
  })

  test('Test buildTree 999', async () => {
    const roots = await buildTree('team-one', 999)

    const masterOrg = roots.find((n) => n.name === 'master-org')
    expect(masterOrg?.name).toEqual('master-org')

    const teamOne = masterOrg.children?.find((c) => c.name === 'team-one')
    expect(teamOne?.children.find((c) => c.name === 'lead-one')).toBeDefined()
  })

  test('Test buildTree 1', async () => {
    const roots = await buildTree('team-one', 1)

    const masterOrg = roots.find((n) => n.name === 'master-org')
    expect(masterOrg?.name).toEqual('master-org')

    const teamOne = masterOrg.children?.find((c) => c.name === 'team-one')
    expect(
      teamOne?.children?.find((c) => c.name === 'lead-one')
    ).not.toBeDefined()
  })
})
