import Testimonial from '../models/Testimonial.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

export const createTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.create({
    name: req.body.name,
    message: req.body.message,
    rating: req.body.rating,
    isPublished: req.body.isPublished,
  })

  res.status(201).json({ status: 'success', testimonial })
})

export const getTestimonials = catchAsync(async (req, res) => {
  const filter = req.user?.role === 'admin' ? {} : { isPublished: true }
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 })
  res.status(200).json({ status: 'success', results: testimonials.length, testimonials })
})

export const getTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id)
  if (!testimonial) return next(new AppError('Testimonial not found.', 404))
  res.status(200).json({ status: 'success', testimonial })
})

export const updateTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
      isPublished: req.body.isPublished,
    },
    { new: true, runValidators: true },
  )

  if (!testimonial) return next(new AppError('Testimonial not found.', 404))
  res.status(200).json({ status: 'success', testimonial })
})

export const deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
  if (!testimonial) return next(new AppError('Testimonial not found.', 404))
  res.status(204).json({ status: 'success', data: null })
})
