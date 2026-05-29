import { Router } from 'express'
import { body } from 'express-validator'
import { forgotPassword, login, me, signup } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const passwordRule = body('password')
  .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  .withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.')

router.post(
  '/signup',
  [
    body('fullName').trim().isLength({ min: 2 }).withMessage('Full name is required.'),
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.'),
    body('phoneNumber').trim().isLength({ min: 8 }).withMessage('Enter a valid phone number.'),
    passwordRule,
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.'),
  ],
  validate,
  signup,
)

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  validate,
  login,
)

router.post('/forgot-password', [body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.')], validate, forgotPassword)
router.get('/me', protect, me)

export default router
