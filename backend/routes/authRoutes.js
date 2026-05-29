import express from 'express'
import { body, param } from 'express-validator'
import {
  adminLogin,
  changePassword,
  forgotPassword,
  login,
  logout,
  me,
  resetPassword,
  signup,
} from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = express.Router()

function passwordRule(field = 'password', label = 'Password') {
  return body(field)
    .isLength({ min: 8 })
    .withMessage(`${label} must be at least 8 characters.`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(`${label} must include uppercase, lowercase, and number.`)
}

router.post(
  '/signup',
  [
    body('fullName').trim().isLength({ min: 2 }).withMessage('Full name is required.'),
    body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('phoneNumber').trim().isLength({ min: 6 }).withMessage('Phone number is required.'),
    passwordRule(),
  ],
  validate,
  signup,
)

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  validate,
  login,
)

router.post(
  '/admin/login',
  [
    body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  validate,
  adminLogin,
)

router.post('/logout', logout)

router.post(
  '/forgot-password',
  [body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail()],
  validate,
  forgotPassword,
)

router.patch(
  '/reset-password/:token',
  [
    param('token').notEmpty().withMessage('Reset token is required.'),
    passwordRule(),
  ],
  validate,
  resetPassword,
)

router.get('/me', protect, me)

router.patch(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required.'),
    passwordRule('newPassword', 'New password'),
  ],
  validate,
  changePassword,
)

export default router
