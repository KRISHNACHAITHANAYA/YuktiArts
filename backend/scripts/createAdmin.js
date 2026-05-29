import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'
import { logger } from '../utils/logger.js'

dotenv.config()

const [, , emailArg, passwordArg, nameArg = 'Yukti Artful Admin', phoneArg = '0000000000'] = process.argv

if (!emailArg || !passwordArg) {
  logger.error('Usage: npm run create:admin -- admin@example.com StrongPass123 "Admin Name" 9999999999')
  process.exit(1)
}

try {
  await connectDB()

  const existing = await User.findOne({ email: emailArg.toLowerCase() })
  if (existing) {
    existing.role = 'admin'
    if (passwordArg) existing.password = passwordArg
    existing.fullName = nameArg
    existing.phoneNumber = phoneArg
    await existing.save()
    logger.info(`Admin updated: ${existing.email}`)
  } else {
    await User.create({
      fullName: nameArg,
      email: emailArg,
      phoneNumber: phoneArg,
      password: passwordArg,
      role: 'admin',
    })
    logger.info(`Admin created: ${emailArg}`)
  }

  await mongoose.disconnect()
  process.exit(0)
} catch (error) {
  logger.error('Failed to create admin:', error.message)
  await mongoose.disconnect()
  process.exit(1)
}
