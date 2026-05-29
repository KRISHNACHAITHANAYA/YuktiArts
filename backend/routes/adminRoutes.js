import express from 'express'
import { body } from 'express-validator'
import { adminLogin } from '../controllers/authController.js'
import { dashboard } from '../controllers/adminController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = express.Router()

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  validate,
  adminLogin,
)

router.get('/dashboard', protect, restrictTo('admin'), dashboard)

export default router
