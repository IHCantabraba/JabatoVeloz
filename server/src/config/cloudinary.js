import cloudinary from 'cloudinary'
export const cloudinaryConfig = () => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    })
    console.log(`Successfully connected to cloudinary 😄`)
  } catch (error) {
    console.log(`unabled to connect to cloudinary ${error}`)
  }
}
// export default { cloudinaryConfig }
export default cloudinaryConfig
