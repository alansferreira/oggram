import { Entity, Group, User } from '@alell/oggram-common'
import { db } from '../db'

const _generic = db.collection<Entity<any, any>>('entities')
_generic.createIndex({ name: 1 }, { unique: true })

const _groups = db.collection<Group>('entities')
const _users = db.collection<User>('entities')
const _graphNode = db.collection<GraphNode>('entities')

export const generic = _generic
export const groups = _groups
export const users = _users
export const graphNode = _graphNode

export type GraphNode = Entity<any, any> &
  Group &
  User & { paths?: string[]; children?: GraphNode[] }

export async function walkTop(entity: GraphNode, depth = 1) {
  if (!entity?.paths) entity.paths = entity?.spec?.memberOf || [entity.name]
  if (depth < 1) return [entity]
  if (!entity?.spec?.memberOf) return [entity]

  const parents = await graphNode
    .find({ name: { $in: entity?.spec?.memberOf } })
    .toArray()
  // const roots = new Map(parents.map((p) => { return [p.name, [p.name]] }))

  for (const parent of parents) {
    await walkTop(parent, depth - 1)
    entity.paths = parent.paths.map((path) => `${path}/${entity.name}`)
    if (parent?.children?.filter((c) => c.name === entity.name)) continue
    parent.children = [...(parent?.children || []), entity]
  }

  return parents
}

export async function buildTree(from: string, depth = 1): Promise<GraphNode[]> {
  const target = await graphNode.findOne({ name: from })
  const parents = await walkTop(target)
  for (const parent of parents) {
    await walkBottom(parent, depth)
  }

  return parents
}

export async function walkBottom(entity: GraphNode, depth = 1) {
  try {
    const descendents = await graphNode
      .find({ spec: { memberOf: [entity.name] } })
      .toArray()

    if (!descendents?.length) return entity

    entity.children = descendents.map((d) => {
      return {
        ...d,
        paths: entity.paths.map((p) => `${p}/${d.name}`)
      }
    })

    if (depth > 1) {
      for (const child of entity.children) {
        await walkBottom(child, depth - 1)
      }
    }
  } catch (error) {
    console.error(error)
  }

  return entity
}
