import path from 'node:path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const folder = file.fieldname === 'profileImage' ? 'profiles' : 'orders'
    cb(null, path.join(process.cwd(), 'server', 'uploads', folder))
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed.'))
      return
    }
    cb(null, true)
  },
})
