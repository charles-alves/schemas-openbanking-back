import multer from 'multer'

const storege = multer.memoryStorage
const limits = 2 * 1024 * 1024

export const fileUploadMeddleware = multer({
  storege,
  limits
})
