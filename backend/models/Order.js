import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
      index: true,
    },
    artworkType: {
      type: String,
      required: [true, 'Artwork type is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
    },
    referenceImage: {
      type: String,
      default: '',
    },
    budget: {
      type: Number,
      min: [0, 'Budget cannot be negative.'],
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Delivered'],
      default: 'Pending',
    },
  },
  { timestamps: true },
)

orderSchema.pre('save', function setOrderId(next) {
  if (!this.orderId) this.orderId = `YA-${Date.now().toString(36).toUpperCase()}`
  next()
})

orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

export default mongoose.model('Order', orderSchema)
