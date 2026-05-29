import express from 'express'
import { body, param } from 'express-validator'
import { createInquiry, deleteInquiry, getInquiries, getInquiry } from '../controllers/inquiryController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = express.Router()

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required.'),
    body('email').trim().isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
    body('phone').trim().isLength({ min: 6 }).withMessage('Phone number is required.'),
    body('subject').trim().notEmpty().withMessage('Subject is required.'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters.'),
  ],
  validate,
  createInquiry,
)

router.use(protect, restrictTo('admin'))
router.get('/', getInquiries)
router.get('/:id', [param('id').isMongoId().withMessage('Invalid inquiry id.')], validate, getInquiry)
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid inquiry id.')], validate, deleteInquiry)

export default router
