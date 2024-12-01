'use strict'

const Blog = require('../models/blog')

/**
 * Render the home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderHome = async (req, res) => {
  const latestBlogs = await Blog.find()
    .select('banner author createdAt readingTime title reaction totalBookmark')
    .populate({
      path: 'owner',
      select: 'name username profilePhoto',
    })
    .sort({ createdAt: 'desc' })
  console.log(latestBlogs)

  res.render('./pages/home', {
    sessionUser: req.session.user,
    route: req.originalUrl,
    latestBlogs,
  })
}

module.exports = {
  renderHome,
}
