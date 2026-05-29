import express from 'express'
import { body, param } from 'express-validator'
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonial,
  getTestimonials,
  updateTestimonial,
} from '../controllers/testimonialController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = express.Router()

const testimonialValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required.'),
  body('message').trim().isLength({ min: 5 }).withMessage('Message is required.'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.'),
  body('isPublished').optional().isBoolean().withMessage('Published status must be true or false.'),
]

router.get('/', getTestimonials)
router.get('/:id', [param('id').isMongoId().withMessage('Invalid testimonial id.')], validate, getTestimonial)

router.use(protect, restrictTo('admin'))
router.post('/', testimonialValidation, validate, createTestimonial)
router.put('/:id', testimonialValidation, validate, updateTestimonial)
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid testimonial id.')], validate, deleteTestimonial)

export default router
