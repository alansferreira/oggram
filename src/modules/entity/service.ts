import { Entity, Group, User } from '@alell/oggram-common'
import { db } from '../db'

const _generic = db.collection<Entity<any, any>>('entities')
_generic.createIndex({ name: 1 }, { unique: true })

const _groups = db.collection<Group>('entities')
const _users = db.collection<User>('entities')

export const generic = _generic
export const groups = _groups
export const users = _users

export type GraphNode = Entity<any, any> &
  Group &
  User & { children?: GraphNode[] }

export async function buildTree(from: string): Promise<Array<GraphNode>> {
  const target = await generic.findOne({ name: from })
  const parents = await generic
    .find({ name: { $in: target?.spec?.memberOf } })
    .toArray()
  const descendents = await generic
    .find({ spec: { memberOf: [from] } })
    .toArray()

  const entities = new Map(
    [...descendents, target, ...parents].map((e) => [
      e.name,
      { ...e, children: [] }
    ])
  )

  const roots: Array<GraphNode> = []

  for (const key of entities.keys()) {
    const value = entities.get(key)

    if (!value?.spec?.memberOf) {
      roots.push(value)
      continue
    }

    for (const memberOf of value?.spec?.memberOf) {
      entities.get(memberOf).children.push(value)
    }
  }

  if (!roots.length) roots.push(entities.get(target.name))

  return [...roots]
}
