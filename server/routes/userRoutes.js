import { Router } from 'express'
import { body } from 'express-validator'
import { changePassword, updateProfile } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import { validate } from '../middleware/validate.js'

const router = Router()

router.put(
  '/profile',
  protect,
  upload.single('profileImage'),
  [
    body('fullName').optional().trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters.'),
    body('phoneNumber').optional().trim().isLength({ min: 8 }).withMessage('Enter a valid phone number.'),
  ],
  validate,
  updateProfile,
)

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required.'),
    body('newPassword')
      .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
      .withMessage('New password must include uppercase, lowercase, number, and symbol.'),
  ],
  validate,
  changePassword,
)

export default router
