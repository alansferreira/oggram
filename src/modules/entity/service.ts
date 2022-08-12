import { Entity, Group, User } from '@alell/oggram-common'
import { db } from '../db'

const _generic = db.collection<Entity<any, any>>('entity')
_generic.createIndex({ name: 1 }, { unique: true })

const _groups = db.collection<Group>('entity')
const _users = db.collection<User>('entity')

export const generic = _generic
export const groups = _groups
export const users = _users
