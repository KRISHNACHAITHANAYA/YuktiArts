import { Router } from 'express'
import { body } from 'express-validator'
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus } from '../controllers/orderController.js'
import { protect, requireAdmin } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import { validate } from '../middleware/validate.js'

const router = Router()

router.post(
  '/',
  protect,
  upload.single('referenceImage'),
  [
    body('artworkType').trim().notEmpty().withMessage('Artwork type is required.'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters.'),
  ],
  validate,
  createOrder,
)

router.get('/my', protect, getMyOrders)
router.get('/', protect, requireAdmin, getAllOrders)
router.patch(
  '/:id/status',
  protect,
  requireAdmin,
  [body('orderStatus').isIn(['Pending', 'In Progress', 'Completed', 'Delivered']).withMessage('Invalid order status.')],
  validate,
  updateOrderStatus,
)

export default router
