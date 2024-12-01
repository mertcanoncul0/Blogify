'use strict'
/**
 * Creates a username based on the provided name.
 * @param {string} name - The name to generate the username from.
 * @returns {string} - A unique username composed of the lowercase name without spaces followed by a timeastamp
 */
const generateUsername = (name) => {
  const username = name.toLowerCase().replace(' ', '')
  return `${username}-${Date.now()}`
}

module.exports = { generateUsername }
