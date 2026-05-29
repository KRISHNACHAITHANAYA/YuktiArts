import Inquiry from '../models/Inquiry.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

export const createInquiry = catchAsync(async (req, res) => {
  const inquiry = await Inquiry.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
  })

  res.status(201).json({ status: 'success', inquiry })
})

export const getInquiries = catchAsync(async (_req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 })
  res.status(200).json({ status: 'success', results: inquiries.length, inquiries })
})

export const getInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await Inquiry.findById(req.params.id)
  if (!inquiry) return next(new AppError('Inquiry not found.', 404))
  res.status(200).json({ status: 'success', inquiry })
})

export const deleteInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id)
  if (!inquiry) return next(new AppError('Inquiry not found.', 404))
  res.status(204).json({ status: 'success', data: null })
})
