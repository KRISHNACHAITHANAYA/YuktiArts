import express from 'express'
import { body } from 'express-validator'
import { updateProfile } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import validate from '../middleware/validate.js'
import { changePassword } from '../controllers/authController.js'

const router = express.Router()

router.use(protect)

router.put(
  '/profile',
  upload.single('profileImage'),
  [
    body('fullName').optional().trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters.'),
    body('email').optional().trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('phoneNumber').optional().trim().isLength({ min: 6 }).withMessage('Phone number must be valid.'),
  ],
  validate,
  updateProfile,
)

router.put(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required.'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('New password must include uppercase, lowercase, and number.'),
  ],
  validate,
  changePassword,
)

export default router
