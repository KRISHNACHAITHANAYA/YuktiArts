import './config/env.js'
import app from './app.js'
import { connectDB } from './config/db.js'
import { logger } from './utils/logger.js'

const port = process.env.PORT || 5000

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error)
  process.exit(1)
})

let server

try {
  await connectDB()
  server = app.listen(port, () => {
    logger.info(`Yukti Artful API running on port ${port}`)
  })
} catch (error) {
  logger.error('Failed to start server:', error.message)
  process.exit(1)
}

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled rejection:', error)
  server?.close(() => process.exit(1))
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Closing server.')
  server?.close(() => process.exit(0))
})
