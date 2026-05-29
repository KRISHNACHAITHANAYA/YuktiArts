import Artwork from '../models/Artwork.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

function buildArtworkPayload(req) {
  return {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    image: req.file ? `/uploads/gallery/${req.file.filename}` : req.body.image,
  }
}

export const createArtwork = catchAsync(async (req, res) => {
  const artwork = await Artwork.create(buildArtworkPayload(req))
  res.status(201).json({ status: 'success', artwork })
})

export const getArtworks = catchAsync(async (req, res) => {
  const filter = {}
  if (req.query.category) filter.category = req.query.category

  const artworks = await Artwork.find(filter).sort({ createdAt: -1 })
  res.status(200).json({ status: 'success', results: artworks.length, artworks })
})

export const getArtwork = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id)
  if (!artwork) return next(new AppError('Artwork not found.', 404))
  res.status(200).json({ status: 'success', artwork })
})

export const updateArtwork = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findByIdAndUpdate(req.params.id, buildArtworkPayload(req), {
    new: true,
    runValidators: true,
  })

  if (!artwork) return next(new AppError('Artwork not found.', 404))
  res.status(200).json({ status: 'success', artwork })
})

export const deleteArtwork = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findByIdAndDelete(req.params.id)
  if (!artwork) return next(new AppError('Artwork not found.', 404))
  res.status(204).json({ status: 'success', data: null })
})
