import { MongoClient } from 'mongodb'
import { red } from 'colors'

const uri = 'mongodb://127.0.0.1:27017'

export const client = new MongoClient(uri, {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000
})
export const db = client.db('gram', { ignoreUndefined: true })

client.connect((error) => {
  if (error) {
    console.error(`Database connection error from ${red(uri)}`)
    console.error()
    console.error(error)
    process.exit(1)
  }
  console.log(`Database connection success!`)
})
