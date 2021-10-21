import { Db, MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI!
let dbName = process.env.MONGODB_DB

let cachedClient : MongoClient | null = null
let cachedDb : Db | null= null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri)

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}