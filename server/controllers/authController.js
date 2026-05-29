import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

function authResponse(user) {
  return {
    token: signToken(user),
    user: user.toJSON(),
  }
}

export async function signup(req, res, next) {
  try {
    const { fullName, email, phoneNumber, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    res.status(201).json(authResponse(user))
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    res.json(authResponse(user))
  } catch (error) {
    next(error)
  }
}

export async function me(req, res) {
  res.json({ user: req.user.toJSON() })
}

export async function forgotPassword(req, res) {
  res.json({
    message: `If an account exists for ${req.body.email}, a password reset flow should be sent by your email provider.`,
  })
}
