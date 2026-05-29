import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address.'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
      minlength: [8, 'Password must be at least 8 characters.'],
    },
    profileImage: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.createPasswordResetToken = function createPasswordResetToken() {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.password
    delete ret.passwordResetToken
    delete ret.passwordResetExpires
    return ret
  },
})

export default mongoose.model('User', userSchema)
