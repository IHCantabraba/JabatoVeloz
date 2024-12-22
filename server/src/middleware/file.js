import cloudinary from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: (req) => {
      let baseUrl = req.originalUrl.split('/').at(-1)
      console.log(`base url is: ${baseUrl}`)
      if (baseUrl === 'register' || baseUrl === 'user') {
        baseUrl = 'users'
        console.log(`BaseUrl redirected to: ${baseUrl}`)
        return `Jveloz/${baseUrl}`
      } else {
        baseUrl = req.originalUrl.split('/').at(-2)
        console.log(`BaseUrl redirected to: ${baseUrl}`)
        return `Jveloz/${baseUrl}`
      }
    },
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
  }
})

const upload = multer({ storage })

export default upload
