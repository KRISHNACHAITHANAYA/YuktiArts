import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export async function updateProfile(req, res, next) {
  try {
    const updates = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    }

    if (req.file) {
      updates.profileImage = `/uploads/profiles/${req.file.filename}`
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    })

    res.json({ user: user.toJSON() })
  } catch (error) {
    next(error)
  }
}

export async function changePassword(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('+password')
    const matches = await bcrypt.compare(req.body.currentPassword, user.password)

    if (!matches) {
      return res.status(400).json({ message: 'Current password is incorrect.' })
    }

    user.password = await bcrypt.hash(req.body.newPassword, 12)
    await user.save()
    res.json({ message: 'Password updated successfully.' })
  } catch (error) {
    next(error)
  }
}
