import mongoose from 'mongoose'
import { env } from './env'

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI)
    console.log('🚀 Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

// Eventos de conexão
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
    process.exit(0)
  } catch (error) {
    console.error('Error closing MongoDB connection:', error)
    process.exit(1)
  }
})
