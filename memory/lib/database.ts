import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

export async function connectToDatabase() {
  if (client && db) {
    return { client, db }
  }

  try {
    const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set')
    }

    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    await client.connect()
    db = client.db('velto-memory')
    
    console.log('Connected to MongoDB')
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function getDatabase() {
  if (!db) {
    await connectToDatabase()
  }
  return db!
}

export async function closeConnection() {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log('Disconnected from MongoDB')
  }
}

// Health check function
export async function healthCheck() {
  try {
    if (!db) {
      await connectToDatabase()
    }
    await db!.admin().ping()
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}
