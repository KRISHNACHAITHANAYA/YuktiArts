import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

testimonialSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

export default mongoose.model('Testimonial', testimonialSchema)
