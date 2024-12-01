'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')

/**
 * Render the login page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderLogin = (req, res) => {
  const { userAuthenticated } = req.session.user || {}

  // Handle case where user already logged in
  if (userAuthenticated) {
    return res.redirect('/')
  }

  res.render('./pages/login')
}

/**
 * Handles the login process for a user
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves after login process is completed.
 * @throws {Error} - If an error accurs during register process.
 */
const postLogin = async (req, res) => {
  try {
    // Extract user data form request body
    const { email, password } = req.body

    // Find user by email
    const currentUser = await User.findOne({ email })

    // If user not found, return error
    if (!currentUser) {
      return res.status(400).send({
        message: 'Invalid email or password',
        type: 'error',
      })
    }

    // Check if password is valid
    const passwordIsValid = await bcrypt.compare(password, currentUser.password)

    // If password is invalid, return error
    if (!passwordIsValid) {
      return res.status(400).send({
        message: 'Invalid email or password',
        type: 'error',
      })
    }

    // Set session userAuthenticated to true and redirect to homepage
    req.session.user = {
      userAuthenticated: true,
      name: currentUser.name,
      username: currentUser.username,
      profilePhotoURL: currentUser.profilePhotoURL,
    }

    return res.redirect('/')
  } catch (error) {
    console.log('postLogin', error.message)
    throw error
  }
}

module.exports = {
  renderLogin,
  postLogin,
}
