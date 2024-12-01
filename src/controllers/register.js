'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateUsername } = require('../utils/helper')

/**
 * Render the register page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderRegister = (req, res) => {
  const { userAuthenticated } = req.session.user || {}

  // Handle case where user already logged in
  if (userAuthenticated) {
    return res.redirect('/')
  }

  res.render('./pages/register')
}

/**
 * Handles the register process for a user
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves after register process is completed.
 * @throws {Error} - If an error accurs during register process.
 */
const postRegister = async (req, res) => {
  try {
    // Extract user data form request body
    const { name, email, password } = req.body

    // Create username
    const username = generateUsername(name)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with provide ddata
    await User.create({ name, email, password: hashedPassword, username })

    // Redirect user to login page upon successful signup
    res.redirect('/login')
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        return res.status(400).send({
          message: 'This email is already associated with an account.',
          type: 'error',
        })
      }

      if (error.keyPattern.username) {
        return res.status(400).send({
          message: 'This username is already in use',
          type: 'error',
        })
      }
    } else {
      return res.status(400).send({
        message: `Failed to register user. <br>${error.message}`,
        type: 'error',
      })
    }

    console.log('postRegister', error.message)
    throw error
  }
}

module.exports = { renderRegister, postRegister }
