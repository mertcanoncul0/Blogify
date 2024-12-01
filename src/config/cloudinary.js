'use strict'

const cloudinary = require('cloudinary').v2

/**
 * Configures Cloudinary settings for image uploads.
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Uploads an mage base64 to Cloudinary.
 * @param {String} image - The image base64 to upload.
 * @param {String} public_id - The identifier that's used for accessing and delivering the uploaded asset
 * @returns {Promise<string>} A promise that resolves to the secure URL of the uploaded image on Cloudinary.
 * @throws {Error} If there's an error during the upload process.
 */
const uploadToCloudinary = async (image, public_id) => {
  const response = await cloudinary.uploader.upload(image, {
    resource_type: 'auto',
    public_id,
  })

  return response.secure_url
}

module.exports = uploadToCloudinary
