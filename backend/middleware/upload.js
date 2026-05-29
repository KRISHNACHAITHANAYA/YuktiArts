import path from 'node:path'
import multer from 'multer'
import AppError from '../utils/AppError.js'

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const folderByField = {
      profileImage: 'profiles',
      referenceImage: 'orders',
      image: 'gallery',
    }
    cb(null, path.join(process.cwd(), 'backend', 'uploads', folderByField[file.fieldname] || 'gallery'))
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new AppError('Only image files are allowed.', 400))
      return
    }
    cb(null, true)
  },
})
