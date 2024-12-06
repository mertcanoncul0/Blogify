'use strict'

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const markdown = require('../config/markdown')
const User = require('../models/user')

/**
 * Render the home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderBlogDetail = async (req, res) => {
  const sessionUser = req.session.user || {}

  // Destructure blogId from request params
  const { blogId } = req.params

  // Handle case where the provided blogId is not a valid Mongoose ObjectId
  const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId)

  if (!isValidObjectId) {
    return res.render('./pages/404')
  }

  // Handle case where no blog found with provided blogId
  const blogExist = await Blog.exists({
    _id: new mongoose.Types.ObjectId(blogId),
  })

  if (!blogExist) {
    return res.render('./pages/404')
  }

  // Retrieve blog detail and populate owner info
  const blog = await Blog.findById(blogId).populate({
    path: 'owner',
    select: 'name username profilePhoto',
  })

  // Retrieve more blog from blog owner
  const ownerBlogs = await Blog.find({ owner: { _id: blog.owner._id } })
    .select('title reaction totalBookmark owner readingTime createdAt')
    .populate({
      path: 'owner',
      select: 'name username profilePhoto',
    })
    .where('_id')
    .nin(blogId)
    .sort({ createAt: 'desc' })
    .limit(3)

  let user 
  if (req.session.user) {
    user = await User.findOne({username: req.session.user.username})
      .select('reactedBlogs readingList')
  }

  res.render('./pages/blog-detail', {
    sessionUser,
    blog,
    ownerBlogs,
    user,
    route: req.originalUrl,
    markdown
  })
}

module.exports = {
  renderBlogDetail,
}
