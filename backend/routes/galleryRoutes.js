import express from 'express'
import { body, param } from 'express-validator'
import {
  createArtwork,
  deleteArtwork,
  getArtwork,
  getArtworks,
  updateArtwork,
} from '../controllers/artworkController.js'
import { protect, restrictTo } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import validate from '../middleware/validate.js'

const router = express.Router()

const artworkValidation = [
  body('title').trim().notEmpty().withMessage('Artwork title is required.'),
  body('category').trim().notEmpty().withMessage('Artwork category is required.'),
  body('description').optional().trim(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a valid amount.'),
]

router.get('/', getArtworks)
router.get('/:id', [param('id').isMongoId().withMessage('Invalid artwork id.')], validate, getArtwork)

router.use(protect, restrictTo('admin'))
router.post('/', upload.single('image'), artworkValidation, validate, createArtwork)
router.put('/:id', upload.single('image'), artworkValidation, validate, updateArtwork)
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid artwork id.')], validate, deleteArtwork)

export default router
