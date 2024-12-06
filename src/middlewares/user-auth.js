'use strict'

/**
 * Middleware function to check if user is authenticated
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function.
 */
const userAuth = (req, res, next) => {
  const { userAuthenticated } = req.session.user || {}

  // Handle case where user is not authenticated
  if (userAuthenticated) return next()

  // Redirect to registration page if user is not authenticated
  res.redirect('/login')
}

module.exports = userAuth
