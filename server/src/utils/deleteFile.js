import cloudinary from 'cloudinary'
import buildUrl from 'cloudinary-build-url'

const deleteFile = (imgUrl) => {
  try {
    const publicId = buildUrl.extractPublicId(imgUrl)

    console.log(`url to delete :${publicId}`)
    cloudinary.v2.uploader.destroy(publicId, function (error, result) {
      console.log(result, error)
    })
  } catch (error) {
    console.log(`Error occurred trying to delete image `)
  }
}

export default { deleteFile }
