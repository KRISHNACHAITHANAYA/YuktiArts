import Order from '../models/Order.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

export const createOrder = catchAsync(async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    artworkType: req.body.artworkType,
    description: req.body.description,
    budget: req.body.budget || 0,
    referenceImage: req.file ? `/uploads/orders/${req.file.filename}` : req.body.referenceImage || '',
  })

  res.status(201).json({ status: 'success', order })
})

export const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })
  res.status(200).json({ status: 'success', results: orders.length, orders })
})

export const getAllOrders = catchAsync(async (_req, res) => {
  const orders = await Order.find().populate('userId', 'fullName email phoneNumber').sort({ createdAt: -1 })
  res.status(200).json({ status: 'success', results: orders.length, orders })
})

export const getOrder = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, userId: req.user.id }
  const order = await Order.findOne(filter)
  if (!order) return next(new AppError('Order not found.', 404))
  res.status(200).json({ status: 'success', order })
})

export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true, runValidators: true })
  if (!order) return next(new AppError('Order not found.', 404))
  res.status(200).json({ status: 'success', order })
})

export const updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id, orderStatus: 'Pending' },
    {
      artworkType: req.body.artworkType,
      description: req.body.description,
      budget: req.body.budget,
      referenceImage: req.file ? `/uploads/orders/${req.file.filename}` : req.body.referenceImage,
    },
    { new: true, runValidators: true },
  )
  if (!order) return next(new AppError('Order not found or cannot be edited.', 404))
  res.status(200).json({ status: 'success', order })
})

export const deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) return next(new AppError('Order not found.', 404))
  res.status(204).json({ status: 'success', data: null })
})
