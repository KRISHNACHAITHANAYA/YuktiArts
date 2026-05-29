import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

function sendAuth(res, user, statusCode = 200) {
  res.status(statusCode).json({
    status: 'success',
    token: signToken(user),
    user: user.toJSON(),
  })
}

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, email, phoneNumber, password } = req.body
  const existingUser = await User.findOne({ email })

  if (existingUser) return next(new AppError('Email is already registered.', 409))

  const user = await User.create({ fullName, email, phoneNumber, password })
  sendAuth(res, user, 201)
})

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password.', 401))
  }

  sendAuth(res, user)
})

export const adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password.', 401))
  }

  if (user.role !== 'admin') return next(new AppError('Admin access required.', 403))

  sendAuth(res, user)
})

export function logout(_req, res) {
  res.status(200).json({ status: 'success', message: 'Logged out successfully.' })
}

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(200).json({ status: 'success', message: 'If the email exists, reset instructions will be sent.' })
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  res.status(200).json({
    status: 'success',
    message: 'Password reset token generated.',
    ...(process.env.NODE_ENV !== 'production' && { resetToken }),
  })
})

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })

  if (!user) return next(new AppError('Reset token is invalid or expired.', 400))

  user.password = req.body.password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  sendAuth(res, user)
})

export const changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  if (!(await user.comparePassword(req.body.currentPassword))) {
    return next(new AppError('Current password is incorrect.', 400))
  }

  user.password = req.body.newPassword
  await user.save()

  sendAuth(res, user)
})

export function me(req, res) {
  res.status(200).json({ status: 'success', user: req.user.toJSON() })
}
