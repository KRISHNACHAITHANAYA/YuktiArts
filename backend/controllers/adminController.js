import Artwork from '../models/Artwork.js'
import Inquiry from '../models/Inquiry.js'
import Order from '../models/Order.js'
import Testimonial from '../models/Testimonial.js'
import User from '../models/User.js'
import catchAsync from '../utils/catchAsync.js'

export const dashboard = catchAsync(async (_req, res) => {
  const [users, orders, artworks, testimonials, inquiries, pendingOrders] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Order.countDocuments(),
    Artwork.countDocuments(),
    Testimonial.countDocuments(),
    Inquiry.countDocuments(),
    Order.countDocuments({ orderStatus: 'Pending' }),
  ])

  res.status(200).json({
    status: 'success',
    stats: {
      users,
      orders,
      artworks,
      testimonials,
      inquiries,
      pendingOrders,
    },
  })
})
