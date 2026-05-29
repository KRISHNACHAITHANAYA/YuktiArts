import AppError from '../utils/AppError.js'
import { logger } from '../utils/logger.js'

function handleDuplicateKey(error) {
  const field = Object.keys(error.keyValue || {})[0] || 'field'
  return new AppError(`${field} already exists.`, 409)
}

function handleValidationError(error) {
  const message = Object.values(error.errors || {}).map((item) => item.message).join(' ')
  return new AppError(message || 'Validation failed.', 400)
}

function handleCastError() {
  return new AppError('Invalid resource id.', 400)
}

export function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404))
}

export function globalErrorHandler(err, _req, res, _next) {
  let error = err

  if (err.name === 'ValidationError') error = handleValidationError(err)
  if (err.code === 11000) error = handleDuplicateKey(err)
  if (err.name === 'CastError') error = handleCastError(err)

  const statusCode = error.statusCode || 500
  const message = error.isOperational ? error.message : 'Internal server error.'

  logger.error(err.message)

  res.status(statusCode).json({
    status: error.status || 'error',
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}
