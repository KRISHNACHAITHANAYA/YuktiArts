import mongoose from 'mongoose'

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Artwork title is required.'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Artwork category is required.'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Artwork image URL is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Artwork description is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Artwork price is required.'],
      min: [0, 'Price cannot be negative.'],
    },
  },
  { timestamps: true },
)

artworkSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

export default mongoose.model('Artwork', artworkSchema)
