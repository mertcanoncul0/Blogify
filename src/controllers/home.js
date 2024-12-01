'use strict'

const Blog = require('../models/blog')
const getPagination = require('../utils/get-pagination')

/**
 * Render the home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderHome = async (req, res) => {
  const sessionUser = req.session.user || {}

  // Retrieve total amount of created blogs
  const totalBlogs = await Blog.countDocuments()

  // Get pagination object
  const pagination = getPagination('/', req.params, 2, totalBlogs)

  const latestBlogs = await Blog.find()
    .select('banner author createdAt readingTime title reaction totalBookmark')
    .populate({
      path: 'owner',
      select: 'name username profilePhoto',
    })
    .sort({ createdAt: 'desc' })
    .limit(pagination.limit)
    .skip(pagination.skip)

  res.render('./pages/home', {
    sessionUser,
    route: req.originalUrl,
    latestBlogs,
    pagination
  })
}

module.exports = {
  renderHome,
}
