import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'

dotenv.config()

const [fullName, email, phoneNumber, password] = process.argv.slice(2)

if (!fullName || !email || !phoneNumber || !password) {
  console.error('Usage: npm run create:admin -- "Admin Name" admin@example.com +919999999999 "StrongPass@123"')
  process.exit(1)
}

await connectDB()

const existing = await User.findOne({ email })
if (existing) {
  existing.role = 'admin'
  existing.fullName = fullName
  existing.phoneNumber = phoneNumber
  existing.password = await bcrypt.hash(password, 12)
  await existing.save()
  console.log('Existing user promoted to admin.')
  process.exit(0)
}

await User.create({
  fullName,
  email,
  phoneNumber,
  password: await bcrypt.hash(password, 12),
  role: 'admin',
})

console.log('Admin user created.')
process.exit(0)
