import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

config({ override: false })

const { MONGODB_URI } = process.env

export const client = new MongoClient(MONGODB_URI, {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000
})
export const db = client.db('oggram', { ignoreUndefined: true })
