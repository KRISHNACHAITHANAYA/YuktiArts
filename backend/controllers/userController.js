import User from '../models/User.js'
import catchAsync from '../utils/catchAsync.js'

export const updateProfile = catchAsync(async (req, res) => {
  const updates = {
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  }

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key])

  if (req.file) updates.profileImage = `/uploads/profiles/${req.file.filename}`

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ status: 'success', user: user.toJSON() })
})
