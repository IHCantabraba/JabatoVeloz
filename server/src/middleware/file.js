import cloudinary from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
dotenv.config()
/* Jveloz/ */
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: (req) => {
      console.log(`originalUrl is: ${req.originalUrl}`)
      let baseUrl = req.originalUrl.split('/').at(-1)
      console.log(`base url is: ${baseUrl}`)
      if (baseUrl === 'register' || baseUrl === 'user') {
        baseUrl = 'users'
        console.log(`BaseUrl redirected to: ${baseUrl}`)
        return `${process.env.PRJ_NAME}/${baseUrl}`
      } else if (baseUrl === 'producto') {
        baseUrl = 'Products'
        console.log(`BaseUrl redirected to: ${baseUrl}`)
        return `${process.env.PRJ_NAME}/${baseUrl}`
      } else {
        baseUrl = req.originalUrl.split('/').at(-2)
        console.log(`BaseUrl redirected to: ${baseUrl}`)
        return `${process.env.PRJ_NAME}/${baseUrl}`
      }
    },
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
  }
})

const upload = multer({ storage })

export default upload
