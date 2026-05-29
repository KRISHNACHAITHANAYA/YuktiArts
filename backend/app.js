import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './config/env.js'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import testimonialRoutes from './routes/testimonialRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { globalErrorHandler, notFound } from './middleware/errorHandler.js'
import sanitize from './middleware/sanitize.js'
import { logger } from './utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS.'))
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(sanitize)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }),
)

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`)
  next()
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Yukti Artful API is healthy.',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/testimonials', testimonialRoutes)

app.use(notFound)
app.use(globalErrorHandler)

export default app
