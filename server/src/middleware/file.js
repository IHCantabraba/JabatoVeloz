import cloudinary from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
dotenv.config()
/* Jveloz/ */

const FOLDER_NAME = {
  register: 'users',
  user: 'users',
  producto: 'Products'
}
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: (req) => {
      let baseUrl = req.originalUrl.split('/').at(-1)
      const path = FOLDER_NAME[baseUrl] || req.originalUrl.split('/').at(-2)
      const storePath = `${process.env.PRJ_NAME}/${path}`

      return storePath
    },
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
  }
})

const upload = multer({ storage })

export default upload
