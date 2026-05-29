import mongoose from 'mongoose'
import { logger } from '../utils/logger.js'

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required.')
  }

  mongoose.set('strictQuery', true)

  mongoose.connection.on('connected', () => logger.info('MongoDB connected'))
  mongoose.connection.on('error', (error) => logger.error('MongoDB connection error:', error.message))
  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  })
}
