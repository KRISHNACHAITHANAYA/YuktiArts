import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

export const protect = catchAsync(async (req, _res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) return next(new AppError('Unauthorized Access', 401))

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decoded.id)

  if (!user) return next(new AppError('Unauthorized Access', 401))

  req.user = user
  next()
})

export function restrictTo(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403))
    }
    next()
  }
}
