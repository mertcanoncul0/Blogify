'use strict'

const uploadToCloudinary = require('../config/cloudinary')
const crypto = require('crypto')
const Blog = require('../models/blog')
const User = require('../models/user')
const getReadingTime = require('../utils/get-reading-time')

/**
 * Render the home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderCreateBlog = (req, res) => {
  const sessionUser = req.session.user || {}

  res.render('./pages/create-blog', {
    sessionUser,
    route: req.originalUrl,
  })
}

const postCreateBlog = async (req, res) => {
  const { banner, title, content } = req.body

  // Upload blog banner to Cloudinary
  const public_id = crypto.randomBytes(10).toString('hex')
  const bannerURL = await uploadToCloudinary(banner, public_id)

  // Find the user who is creating the blog post
  const user = await User.findOne({
    username: req.session.user.username,
  }).select('_id blogs blogPublished')

  // Create a new blog post
  const newBlog = await Blog.create({
    banner: {
      url: bannerURL,
      public_id,
    },
    title,
    content,
    owner: user._id,
    readingTime: getReadingTime(content),
  })

  // Update user's blog data
  user.blogs.push(newBlog._id)
  user.blogPublished++
  await user.save()

  // Redirect to the newly created blog post page
  res.redirect(`/blog/${newBlog._id}`)
}

module.exports = {
  renderCreateBlog,
  postCreateBlog,
}
