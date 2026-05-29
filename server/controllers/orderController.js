import Order from '../models/Order.js'

export async function createOrder(req, res, next) {
  try {
    const order = await Order.create({
      userId: req.user.id,
      artworkType: req.body.artworkType,
      description: req.body.description,
      referenceImage: req.file ? `/uploads/orders/${req.file.filename}` : '',
    })

    res.status(201).json({ order })
  } catch (error) {
    next(error)
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    next(error)
  }
}

export async function getAllOrders(_req, res, next) {
  try {
    const orders = await Order.find().populate('userId', 'fullName email phoneNumber').sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    next(error)
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true, runValidators: true },
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' })
    }

    res.json({ order })
  } catch (error) {
    next(error)
  }
}
