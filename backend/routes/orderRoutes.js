import express from 'express'
import { body, param } from 'express-validator'
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrder,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import validate from '../middleware/validate.js'

const router = express.Router()

const orderValidation = [
  body('artworkType').trim().notEmpty().withMessage('Artwork type is required.'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters.'),
  body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a valid amount.'),
]

router.use(protect)

router.get('/my', getMyOrders)
router.post('/', upload.single('referenceImage'), orderValidation, validate, createOrder)
router.get('/', restrictTo('admin'), getAllOrders)
router.get('/:id', [param('id').isMongoId().withMessage('Invalid order id.')], validate, getOrder)
router.put('/:id', upload.single('referenceImage'), orderValidation, validate, updateOrder)
router.patch(
  '/:id/status',
  restrictTo('admin'),
  [
    param('id').isMongoId().withMessage('Invalid order id.'),
    body('orderStatus').isIn(['Pending', 'In Progress', 'Completed', 'Delivered']).withMessage('Invalid order status.'),
  ],
  validate,
  updateOrderStatus,
)
router.delete('/:id', restrictTo('admin'), [param('id').isMongoId().withMessage('Invalid order id.')], validate, deleteOrder)

export default router
